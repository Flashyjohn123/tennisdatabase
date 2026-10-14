import React, { useState, useRef } from 'react';
import { X, Download, Upload, Check, AlertCircle, HardDrive } from 'lucide-react';
import { favoritesService } from '../services/favoritesService';
import { Player, Match } from '../types/tennis';

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  matches: Match[];
  onRestoreData: (restored: { players?: Player[]; matches?: Match[] }) => void;
}

export const DataBackupModal: React.FC<DataBackupModalProps> = ({
  isOpen,
  onClose,
  players,
  matches,
  onRestoreData,
}) => {
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    try {
      const backupData = {
        version: 'tennisdb_v1',
        exportedAt: new Date().toISOString(),
        favorites: favoritesService.getFavorites(),
        customPlayers: players.filter(p => p.id.startsWith('custom-') || !['jannik-sinner', 'carlos-alcaraz'].includes(p.id)),
        matches,
        surfacePreference: localStorage.getItem('tennisdb_surface_season_preference') || 'auto',
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tennis-database-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatusMessage({ text: 'Backup exported successfully!' });
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (e) {
      setStatusMessage({ text: 'Export failed. Please try again.', isError: true });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        if (parsed.favorites && Array.isArray(parsed.favorites)) {
          parsed.favorites.forEach((id: string) => {
            if (!favoritesService.isFavorite(id)) {
              favoritesService.toggleFavorite(id);
            }
          });
        }

        if (parsed.surfacePreference) {
          localStorage.setItem('tennisdb_surface_season_preference', parsed.surfacePreference);
        }

        onRestoreData({
          players: parsed.customPlayers || parsed.players,
          matches: parsed.matches,
        });

        setStatusMessage({ text: 'Data restored successfully from backup!' });
        setTimeout(() => {
          setStatusMessage(null);
          onClose();
        }, 1500);
      } catch (err) {
        setStatusMessage({ text: 'Invalid backup file format.', isError: true });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0a0c10] border border-white/[0.12] rounded-2xl shadow-2xl p-6 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-theme-accent/15 border border-theme-accent/30 flex items-center justify-center text-theme-accent">
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-base text-white tracking-tight">
                Database Sync & Backup
              </h3>
              <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                Cross-Device Data Portability
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-4">
          <p className="text-xs text-white/70 leading-relaxed font-sans">
            Transfer your starred player watchlist, customized athlete dossiers, and recorded match scorecards across devices or keep an offline archive.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Export Card */}
            <button
              type="button"
              onClick={handleExport}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-theme-accent/40 text-center transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] group-hover:bg-theme-accent/20 flex items-center justify-center text-white/70 group-hover:text-theme-accent mb-2.5 transition">
                <Download className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs font-semibold text-white group-hover:text-theme-accent">
                Export JSON
              </span>
              <span className="font-sans text-[10px] text-white/40 mt-0.5">
                Save to disk
              </span>
            </button>

            {/* Import Card */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-emerald-400/40 text-center transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] group-hover:bg-emerald-400/20 flex items-center justify-center text-white/70 group-hover:text-emerald-400 mb-2.5 transition">
                <Upload className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs font-semibold text-white group-hover:text-emerald-400">
                Import JSON
              </span>
              <span className="font-sans text-[10px] text-white/40 mt-0.5">
                Restore backup
              </span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>

          {/* Status Alert */}
          {statusMessage && (
            <div
              className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-mono animate-fade-in ${
                statusMessage.isError
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              }`}
            >
              {statusMessage.isError ? (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              ) : (
                <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/[0.08] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white text-xs font-mono transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
