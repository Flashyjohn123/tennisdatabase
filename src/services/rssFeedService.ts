// Client-side RSS feed service with multi-proxy fallback and intelligent tennis categorization
import { LiveFeedItem, FeedCategory, FeedSeverity } from '../types/tennis';

export interface RssFeedConfig {
  id: string;
  name: string;
  url: string;
  categoryDefault?: FeedCategory;
}

export const KNOWN_RSS_SOURCES: RssFeedConfig[] = [
  {
    id: 'espn-tennis',
    name: 'ESPN Tennis',
    url: 'https://www.espn.com/espn/rss/tennis/news',
    categoryDefault: 'breaking',
  },
  {
    id: 'atp-tour',
    name: 'ATP Tour News',
    url: 'https://www.atptour.com/en/media/rss/news',
    categoryDefault: 'breaking',
  },
  {
    id: 'wta-tennis',
    name: 'WTA Tennis News',
    url: 'https://www.wtatennis.com/rss-news.xml',
    categoryDefault: 'breaking',
  },
];

const DEV_PROXIES: Record<string, string> = {
  'espn-tennis': '/api/proxy/espn-tennis',
  'atp-tour': '/api/proxy/atp-tour',
  'wta-tennis': '/api/proxy/wta-tennis',
};

export function isAuthorizedSource(source: string): boolean {
  if (!source) return false;
  const s = source.toUpperCase();
  return s.includes('ESPN') || s.includes('ATP') || s.includes('WTA');
}

const CORS_PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

// Categorization keyword rules
const KEYWORDS_INJURY = [
  'injur', 'surgery', 'scan', 'mri', 'tear', 'strain', 'wrist', 'knee', 'elbow',
  'ankle', 'hamstring', 'hip', 'abdom', 'rehab', 'illness', 'virus', 'fever',
  'dehydration', 'medical timeout', 'back pain', 'achilles', 'concussion',
];

const KEYWORDS_WITHDRAWAL = [
  'withdraw', 'walkover', 'pulls out', 'pulled out', 'retires', 'retirement',
  'forced to retire', 'concede', 'w/o', 'abandon', 'concedes',
];

const KEYWORDS_CONTROVERSY = [
  'dop', 'umpire', 'fine', 'fined', 'penalty', 'dispute', 'scandal', 'banned',
  'investigat', 'protest', 'clash', 'code violation', 'argument', 'controversy',
  'ptpa', 'lawsuit', 'appeal', 'suspended', 'cas ', 'itia',
];

const KEYWORDS_MATCH_RESULT = [
  'defeat', 'defeats', 'beat', 'beats', 'downed', 'sweeps', 'final', 'semifinal',
  'quarterfinal', 'champion', 'title', 'set', 'win', 'wins', 'score', 'trophy',
  'triumph', 'upset', 'edges', 'rallies', 'outlasts',
];

const KEYWORDS_TOURNAMENT = [
  'draw', 'wild card', 'wildcard', 'schedule', 'prize money', 'ranking', 'seeds',
  'qualif', 'order of play', 'venue', 'resurfac', 'entry list', 'court',
];

// Detect category from text
export function detectFeedCategory(title: string, summary: string, fallback: FeedCategory = 'breaking'): FeedCategory {
  const combined = `${title} ${summary}`.toLowerCase();

  if (KEYWORDS_WITHDRAWAL.some((kw) => combined.includes(kw))) {
    return 'withdrawal';
  }
  if (KEYWORDS_INJURY.some((kw) => combined.includes(kw))) {
    return 'injury';
  }
  if (KEYWORDS_CONTROVERSY.some((kw) => combined.includes(kw))) {
    return 'controversy';
  }
  if (KEYWORDS_MATCH_RESULT.some((kw) => combined.includes(kw))) {
    return 'match_result';
  }
  if (KEYWORDS_TOURNAMENT.some((kw) => combined.includes(kw))) {
    return 'tournament_update';
  }
  return fallback;
}

// Detect severity level
export function detectFeedSeverity(title: string, summary: string, category: FeedCategory): FeedSeverity {
  const combined = `${title} ${summary}`.toLowerCase();

  if (
    combined.includes('urgent') ||
    combined.includes('emergency') ||
    combined.includes('doping') ||
    combined.includes('banned') ||
    combined.includes('walkover') ||
    combined.includes('grand slam final') ||
    combined.includes('surgery')
  ) {
    return 'urgent';
  }

  if (
    category === 'injury' ||
    category === 'withdrawal' ||
    category === 'controversy' ||
    combined.includes('breaking') ||
    combined.includes('champion') ||
    combined.includes('upset')
  ) {
    return 'high';
  }

  if (category === 'match_result' || category === 'tournament_update') {
    return 'medium';
  }

  return 'low';
}

// Strip HTML tags and clean up string
function cleanHtml(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Parse XML string safely using DOMParser (or regex fallback)
export function parseRssXml(xmlString: string, sourceName: string): LiveFeedItem[] {
  const items: LiveFeedItem[] = [];

  try {
    if (typeof window !== 'undefined' && window.DOMParser) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      const itemElements = xmlDoc.querySelectorAll('item, entry');

      itemElements.forEach((el, index) => {
        const titleEl = el.querySelector('title');
        const descEl = el.querySelector('description, summary, content');
        const linkEl = el.querySelector('link');
        const pubDateEl = el.querySelector('pubDate, published, updated, dc\\:date');
        const guidEl = el.querySelector('guid, id');

        const title = cleanHtml(titleEl?.textContent || '');
        const summary = cleanHtml(descEl?.textContent || title);
        let link = linkEl?.textContent || '';
        if (!link && linkEl?.getAttribute('href')) {
          link = linkEl.getAttribute('href') || '';
        }
        const pubDate = pubDateEl?.textContent ? new Date(pubDateEl.textContent).toISOString() : new Date().toISOString();
        const id = guidEl?.textContent || `${sourceName}-${Date.now()}-${index}`;

        if (title && isAuthorizedSource(sourceName)) {
          const category = detectFeedCategory(title, summary);
          const severity = detectFeedSeverity(title, summary, category);

          items.push({
            id: `rss-${id.replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 60)}`,
            title,
            summary: summary.length > 280 ? summary.slice(0, 277) + '...' : summary,
            category,
            severity,
            timestamp: pubDate,
            source: sourceName,
            url: link || undefined,
            verified: true,
            isLive: false,
          });
        }
      });
      return items;
    }
  } catch (err) {
    console.warn('DOMParser failed, trying regex fallback', err);
  }

  // Regex fallback parser
  const itemRegex = /<item[\s\S]*?<\/item>/gi;
  const matches = xmlString.match(itemRegex) || [];

  matches.forEach((itemBlock, idx) => {
    const titleMatch = itemBlock.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const descMatch = itemBlock.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
    const linkMatch = itemBlock.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
    const dateMatch = itemBlock.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);

    const title = cleanHtml(titleMatch ? titleMatch[1] : '');
    const summary = cleanHtml(descMatch ? descMatch[1] : title);
    const link = cleanHtml(linkMatch ? linkMatch[1] : '');
    const pubDate = dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString();

    if (title && isAuthorizedSource(sourceName)) {
      const category = detectFeedCategory(title, summary);
      const severity = detectFeedSeverity(title, summary, category);

      items.push({
        id: `rss-regex-${Date.now()}-${idx}`,
        title,
        summary: summary.length > 280 ? summary.slice(0, 277) + '...' : summary,
        category,
        severity,
        timestamp: pubDate,
        source: sourceName,
        url: link || undefined,
        verified: true,
      });
    }
  });

  return items;
}

// Fetch single RSS feed with proxy rotation & timeout
export async function fetchRssFeed(feed: RssFeedConfig, timeoutMs = 6000): Promise<LiveFeedItem[]> {
  const isLocalDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const candidateUrls: string[] = [];

  // Prioritize local Vite dev proxy to completely bypass browser CORS restrictions
  if (isLocalDev && DEV_PROXIES[feed.id]) {
    candidateUrls.push(DEV_PROXIES[feed.id]);
  }

  // Next, use reliable public CORS proxy wrappers
  CORS_PROXIES.forEach((proxyFn) => candidateUrls.push(proxyFn(feed.url)));

  for (const targetUrl of candidateUrls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          Accept: 'application/rss+xml, application/xml, text/xml, */*',
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const text = await response.text();
        if (text && (text.includes('<rss') || text.includes('<feed') || text.includes('<xml') || text.includes('<channel'))) {
          const parsed = parseRssXml(text, feed.name);
          if (parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (err) {
      // Continue to next proxy
    }
  }

  return [];
}

// Fetch all configured RSS feeds in parallel with failure resilience
export async function fetchAllRssFeeds(feeds: RssFeedConfig[] = KNOWN_RSS_SOURCES): Promise<LiveFeedItem[]> {
  const promises = feeds.map((feed) =>
    fetchRssFeed(feed).catch((err) => {
      console.warn(`Failed to fetch RSS from ${feed.name}:`, err);
      return [] as LiveFeedItem[];
    })
  );

  const results = await Promise.allSettled(promises);
  const aggregated: LiveFeedItem[] = [];

  results.forEach((res) => {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      aggregated.push(...res.value);
    }
  });

  // Sort latest first
  return aggregated.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
