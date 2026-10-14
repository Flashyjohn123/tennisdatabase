// Service for managing favorite/watchlisted players with localStorage persistence

const FAVORITES_KEY = 'tennisdb_favorites_v1';

export class FavoritesService {
  private favorites: Set<string>;
  private listeners: Set<(favorites: string[]) => void> = new Set();

  constructor() {
    this.favorites = this.loadFavorites();
  }

  private loadFavorites(): Set<string> {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return new Set(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load favorites from localStorage', e);
    }
    // Default favorites for first-time visitors
    return new Set(['carlos-alcaraz', 'jannik-sinner', 'aryna-sabalenka', 'iga-swiatek']);
  }

  private saveFavorites(): void {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(this.favorites)));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
    this.notify();
  }

  private notify(): void {
    const list = this.getFavorites();
    this.listeners.forEach((listener) => listener(list));
  }

  public getFavorites(): string[] {
    return Array.from(this.favorites);
  }

  public isFavorite(id: string): boolean {
    return this.favorites.has(id);
  }

  public toggleFavorite(id: string): boolean {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    } else {
      this.favorites.add(id);
    }
    this.saveFavorites();
    return this.favorites.has(id);
  }

  public addFavorite(id: string): void {
    if (!this.favorites.has(id)) {
      this.favorites.add(id);
      this.saveFavorites();
    }
  }

  public removeFavorite(id: string): void {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
      this.saveFavorites();
    }
  }

  public subscribe(listener: (favorites: string[]) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const favoritesService = new FavoritesService();
export default favoritesService;
