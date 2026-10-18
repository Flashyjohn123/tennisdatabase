// Real-time 24/7 live feed manager with RSS merge, simulated event injection, and local storage persistence
import { LiveFeedItem, ApiConfig, FeedCategory, FeedSeverity } from '../types/tennis';
import { MOCK_LIVE_FEED_ITEMS } from '../data/mockLiveFeedData';
import { fetchAllRssFeeds, KNOWN_RSS_SOURCES, isAuthorizedSource, decodeHtmlEntities } from './rssFeedService';
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY_FEED = 'tennisdb_live_feed_v20';
const STORAGE_KEY_CONFIG = 'tennisdb_feed_config_v20';

const DEFAULT_CONFIG: ApiConfig = {
  rapidApiKey: '',
  apiTennisKey: '',
  pollIntervalMs: 45000,
  enabledFeeds: KNOWN_RSS_SOURCES.map((s) => s.id),
  useMockFallback: true,
  autoRefresh: true,
};

// Simulation bank of high-energy live updates for continuous injection
const SIMULATION_EVENTS_POOL: Array<{
  title: string;
  summary: string;
  category: FeedCategory;
  severity: FeedSeverity;
  source: string;
  playerNames?: string[];
  tournamentName?: string;
  tags?: string[];
}> = [
  {
    title: 'LIVE ALERT: Flash medical timeout called on Stadium 1 for lower back massage',
    summary: 'Physiotherapist currently treating player during standard 3-minute medical interval with play momentarily paused.',
    category: 'injury',
    severity: 'medium',
    source: 'ATP Tour Communications',
    playerNames: ['Carlos Alcaraz'],
    tournamentName: 'Roland Garros',
    tags: ['Medical Timeout', 'Live Court', 'Physio'],
  },
  {
    title: 'BREAKING: Electronic line calling overturns crucial baseline winner at 30-40',
    summary: 'Optical tracking replay confirms ball caught 2mm of the white line, reversing original out call to an ace.',
    category: 'controversy',
    severity: 'low',
    source: 'ATP Official Match Operations',
    tags: ['ELC', 'Challenge', 'Live Call'],
  },
  {
    title: 'MATCH RESULT: Sinner delivers 3 straight aces to seal 7-6(4), 6-4 victory',
    summary: 'World No. 1 converts second match point with a 218 km/h kicker out wide to reach the semifinals.',
    category: 'match_result',
    severity: 'high',
    source: 'ATP Tour Communications',
    playerNames: ['Jannik Sinner'],
    tournamentName: 'Italian Open',
    tags: ['Victory', 'Sinner', 'Match Point'],
  },
  {
    title: 'TOURNAMENT UPDATE: Weather delay lifted, outer courts resuming play within 15 minutes',
    summary: 'Groundskeeping crew has completely dried the baseline turf and chair umpires are calling players out for warmup.',
    category: 'tournament_update',
    severity: 'low',
    source: 'ATP Tour Communications',
    tournamentName: 'Wimbledon',
    tags: ['Weather', 'Resumption', 'Courts'],
  },
  {
    title: 'WALKOVER ANNOUNCEMENT: Rybakina withdraws due to viral respiratory flare-up',
    summary: 'Official tournament bulletin confirms withdrawal following morning physical evaluation by medical staff.',
    category: 'withdrawal',
    severity: 'urgent',
    source: 'WTA Tour Communications',
    playerNames: ['Elena Rybakina'],
    tags: ['Walkover', 'Illness', 'WTA'],
  },
  {
    title: 'BREAKING: Sabalenka strikes 44th winner of the match to secure semifinal spot',
    summary: 'Dominant baseline slugfest concluded in 1 hour 42 minutes with an 84% first-serve conversion rate.',
    category: 'match_result',
    severity: 'high',
    source: 'WTA Live Operations',
    playerNames: ['Aryna Sabalenka'],
    tournamentName: 'US Open',
    tags: ['Winner', 'Sabalenka', 'US Open'],
  },
  {
    title: 'INJURY ALERT: Alcaraz testing right arm with compression sleeve in practice session',
    summary: 'Alcaraz seen completing baseline drill sets with specialized elastomeric strapping under trainer supervision.',
    category: 'injury',
    severity: 'medium',
    source: 'ESPN Tennis Analytics',
    playerNames: ['Carlos Alcaraz'],
    tags: ['Practice', 'Forearm', 'Training'],
  },
  {
    title: 'CONTROVERSY: Code violation warning issued for racket abuse following lost tiebreak',
    summary: 'Chair umpire warns player box after racket frame damage on clay surface near umpire chair.',
    category: 'controversy',
    severity: 'medium',
    source: 'ATP Official Match Operations',
    tags: ['Violation', 'Code of Conduct'],
  },
];

type FeedSubscriber = (items: LiveFeedItem[]) => void;

class LiveFeedEngineService {
  private items: LiveFeedItem[] = [];
  private subscribers: Set<FeedSubscriber> = new Set();
  private config: ApiConfig = DEFAULT_CONFIG;
  private timer: any = null;
  private simulationIndex = 0;
  private isInitialized = false;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;

    try {
      const savedConfig = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (savedConfig) {
        this.config = { ...DEFAULT_CONFIG, ...JSON.parse(savedConfig) };
      }

      const savedItems = localStorage.getItem(STORAGE_KEY_FEED);
      if (savedItems) {
        const parsed = JSON.parse(savedItems);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Strictly filter through isAuthorizedSource and clean HTML entities
          this.items = parsed
            .filter((item: LiveFeedItem) => item && isAuthorizedSource(item.source))
            .map((item: LiveFeedItem) => ({
              ...item,
              title: decodeHtmlEntities(item.title),
              summary: decodeHtmlEntities(item.summary),
            }));
        }
      }
    } catch (e) {
      console.error('Error reading live feed from localStorage', e);
    }

    if (this.items.length === 0) {
      this.items = MOCK_LIVE_FEED_ITEMS
        .filter((item) => isAuthorizedSource(item.source))
        .map((item) => ({
          ...item,
          title: decodeHtmlEntities(item.title),
          summary: decodeHtmlEntities(item.summary),
        }));
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      // Keep most recent 200 items in storage to avoid bloat
      const trimmed = this.items.slice(0, 200);
      localStorage.setItem(STORAGE_KEY_FEED, JSON.stringify(trimmed));
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(this.config));
    } catch (e) {
      console.error('Error saving live feed to localStorage', e);
    }
  }

  private notify() {
    this.subscribers.forEach((cb) => cb([...this.items]));
    this.saveToStorage();
  }

  public init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.startEngine();
  }

  public startEngine() {
    this.stopEngine();

    // Initial RSS fetch merge
    this.fetchAndMergeRss();

    // Set recurring timer to fetch live ATP & WTA news
    const interval = Math.max(15000, this.config.pollIntervalMs || 30000);
    this.timer = setInterval(() => {
      if (this.config.autoRefresh) {
        this.fetchAndMergeRss();
      }
    }, interval);
  }

  public stopEngine() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public async fetchAndMergeRss(): Promise<void> {
    try {
      const rssItems = await fetchAllRssFeeds();
      if (rssItems.length > 0) {
        this.mergeNewItems(rssItems);
      }
    } catch (err) {
      console.warn('RSS fetch error in LiveFeedEngine:', err);
    }
  }

  public mergeNewItems(newItems: LiveFeedItem[]) {
    const existingIds = new Set(this.items.map((i) => i.id));
    const existingTitles = new Set(this.items.map((i) => i.title.trim().toLowerCase()));

    const uniqueIncoming = newItems
      .filter(
        (item) =>
          item &&
          isAuthorizedSource(item.source) &&
          !existingIds.has(item.id) &&
          !existingTitles.has(item.title.trim().toLowerCase())
      )
      .map((item) => ({
        ...item,
        title: decodeHtmlEntities(item.title),
        summary: decodeHtmlEntities(item.summary),
      }));

    if (uniqueIncoming.length > 0) {
      this.items = [...uniqueIncoming, ...this.items].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      this.notify();
    }
  }

  public injectSimulatedLiveEvent(): LiveFeedItem {
    const poolItem = SIMULATION_EVENTS_POOL[this.simulationIndex % SIMULATION_EVENTS_POOL.length];
    this.simulationIndex++;

    const now = new Date();
    const liveItem: LiveFeedItem = {
      id: `live-sim-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: poolItem.title,
      summary: poolItem.summary,
      category: poolItem.category,
      severity: poolItem.severity,
      timestamp: now.toISOString(),
      source: poolItem.source,
      playerNames: poolItem.playerNames,
      tournamentName: poolItem.tournamentName,
      tags: poolItem.tags,
      isLive: true,
      verified: true,
    };

    this.items = [liveItem, ...this.items];
    this.notify();
    return liveItem;
  }

  public addManualItem(itemData: Partial<LiveFeedItem>): LiveFeedItem {
    const source = itemData.source && isAuthorizedSource(itemData.source)
      ? itemData.source
      : 'ATP Tour Communications';

    const newItem: LiveFeedItem = {
      id: itemData.id || `custom-${Date.now()}`,
      title: itemData.title || 'Breaking Tennis Alert',
      summary: itemData.summary || '',
      category: itemData.category || 'breaking',
      severity: itemData.severity || 'medium',
      timestamp: itemData.timestamp || new Date().toISOString(),
      source,
      url: itemData.url,
      playerIds: itemData.playerIds,
      playerNames: itemData.playerNames,
      tournamentId: itemData.tournamentId,
      tournamentName: itemData.tournamentName,
      isLive: itemData.isLive ?? true,
      verified: itemData.verified ?? true,
      tags: itemData.tags || [],
    };

    this.items = [newItem, ...this.items];
    this.notify();
    return newItem;
  }

  public getItems(): LiveFeedItem[] {
    return [...this.items];
  }

  public getItemsByCategory(category: FeedCategory): LiveFeedItem[] {
    return this.items.filter((i) => i.category === category);
  }

  public getItemsByPlayer(playerIdOrName: string): LiveFeedItem[] {
    const query = playerIdOrName.toLowerCase();
    return this.items.filter(
      (i) =>
        i.playerIds?.some((id) => id.toLowerCase().includes(query)) ||
        i.playerNames?.some((name) => name.toLowerCase().includes(query)) ||
        i.title.toLowerCase().includes(query) ||
        i.summary.toLowerCase().includes(query)
    );
  }

  public resetToDefaults() {
    this.items = [...MOCK_LIVE_FEED_ITEMS];
    this.config = { ...DEFAULT_CONFIG };
    this.notify();
  }

  public clearAll() {
    this.items = [];
    this.notify();
  }

  public getConfig(): ApiConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<ApiConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.saveToStorage();
    if (this.config.autoRefresh) {
      this.startEngine();
    } else {
      this.stopEngine();
    }
  }

  public subscribe(subscriber: FeedSubscriber): () => void {
    this.subscribers.add(subscriber);
    subscriber([...this.items]);
    this.init();

    return () => {
      this.subscribers.delete(subscriber);
    };
  }
}

// Global singleton instance
export const liveFeedEngine = new LiveFeedEngineService();

// React Hook for easy UI consumption
export function useLiveFeed(initialFilterCategory?: FeedCategory) {
  const [items, setItems] = useState<LiveFeedItem[]>(() => liveFeedEngine.getItems());
  const [selectedCategory, setSelectedCategory] = useState<FeedCategory | 'ALL'>(
    initialFilterCategory || 'ALL'
  );
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [config, setConfig] = useState<ApiConfig>(() => liveFeedEngine.getConfig());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = liveFeedEngine.subscribe((updatedItems) => {
      setItems(updatedItems);
      setConfig(liveFeedEngine.getConfig());
    });
    return unsubscribe;
  }, []);

  const refreshFeed = useCallback(async () => {
    setIsRefreshing(true);
    await liveFeedEngine.fetchAndMergeRss();
    setIsRefreshing(false);
  }, []);

  const addLiveItem = useCallback((item: Partial<LiveFeedItem>) => {
    return liveFeedEngine.addManualItem(item);
  }, []);

  const updateConfig = useCallback((newConfig: Partial<ApiConfig>) => {
    liveFeedEngine.updateConfig(newConfig);
    setConfig(liveFeedEngine.getConfig());
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      !searchFilter ||
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.playerNames?.some((n) => n.toLowerCase().includes(searchFilter.toLowerCase())) ||
      item.tournamentName?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(searchFilter.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return {
    items: filteredItems,
    allItems: items,
    selectedCategory,
    setSelectedCategory,
    searchFilter,
    setSearchFilter,
    refreshFeed,
    addLiveItem,
    config,
    updateConfig,
    isRefreshing,
    totalCount: items.length,
    activeInjuriesCount: items.filter((i) => i.category === 'injury').length,
    withdrawalsCount: items.filter((i) => i.category === 'withdrawal').length,
    controversiesCount: items.filter((i) => i.category === 'controversy').length,
  };
}

export default liveFeedEngine;
