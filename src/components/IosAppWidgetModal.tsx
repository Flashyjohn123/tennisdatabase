import React, { useState } from 'react';
import { X, Smartphone, Tablet, Share, PlusSquare, Copy, Check, Sparkles, LayoutGrid } from 'lucide-react';

interface IosAppWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WIDGET_SCRIPT = `// Circuit Pro - iOS & iPadOS Home Screen Widget
// Run inside Scriptable (free on App Store)
const widget = new ListWidget();
widget.backgroundColor = new Color("#07080b");

const header = widget.addStack();
header.layoutHorizontally();
header.centerAlignContent();

const logo = header.addText("CIRCUIT PRO");
logo.font = Font.boldSystemFont(11);
logo.textColor = new Color("#ffffff");

header.addSpacer();

const badge = header.addText("2026 LIVE");
badge.font = Font.boldMonospacedSystemFont(9);
badge.textColor = new Color("#ccff00");

widget.addSpacer(8);
const line = widget.addStack();
line.size = new Size(0, 1);
line.backgroundColor = new Color("#ffffff", 0.15);
widget.addSpacer(8);

const atp = widget.addStack();
atp.layoutHorizontally();
atp.centerAlignContent();
const atpTag = atp.addText("ATP #1 ");
atpTag.font = Font.boldMonospacedSystemFont(10);
atpTag.textColor = new Color("#38bdf8");
const atpName = atp.addText("Jannik Sinner");
atpName.font = Font.semiboldSystemFont(12);
atpName.textColor = new Color("#f1f5f9");
atp.addSpacer();
const atpPts = atp.addText("13,450 pts");
atpPts.font = Font.monospacedDigitSystemFont(10);
atpPts.textColor = new Color("#94a3b8");

widget.addSpacer(6);

const wta = widget.addStack();
wta.layoutHorizontally();
wta.centerAlignContent();
const wtaTag = wta.addText("WTA #1 ");
wtaTag.font = Font.boldMonospacedSystemFont(10);
wtaTag.textColor = new Color("#f472b6");
const wtaName = wta.addText("Aryna Sabalenka");
wtaName.font = Font.semiboldSystemFont(12);
wtaName.textColor = new Color("#f1f5f9");
wta.addSpacer();
const wtaPts = wta.addText("8,575 pts");
wtaPts.font = Font.monospacedDigitSystemFont(10);
wtaPts.textColor = new Color("#94a3b8");

widget.addSpacer(8);

const footer = widget.addStack();
footer.layoutHorizontally();
footer.centerAlignContent();
const dot = footer.addText("● ");
dot.font = Font.systemFont(8);
dot.textColor = new Color("#3b82f6");
const surface = footer.addText("Hard Court Season");
surface.font = Font.systemFont(9);
surface.textColor = new Color("#64748b");
footer.addSpacer();
const telemetry = footer.addText("Telemetry Online");
telemetry.font = Font.systemFont(9);
telemetry.textColor = new Color("#22c55e");

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();`;

export const IosAppWidgetModal: React.FC<IosAppWidgetModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'app' | 'widget'>('app');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(WIDGET_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentHost = window.location.hostname;
  const isLocalhost = currentHost === 'localhost' || currentHost === '127.0.0.1';
  const networkUrl = isLocalhost ? `http://192.168.1.117:5175/` : window.location.href;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-xl bg-[#090d14] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-theme-accent/10 border border-theme-accent/30 flex items-center justify-center text-theme-accent">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
                Install Circuit Pro on iOS
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-theme-accent/20 text-theme-accent border border-theme-accent/30">
                  iPhone & iPad
                </span>
              </h2>
              <p className="text-xs text-white/50 font-mono">
                Native App Mode & Home Screen Widgets
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/[0.08] bg-black/40 px-6 pt-3">
          <button
            onClick={() => setActiveTab('app')}
            className={`pb-3 px-4 font-mono text-xs font-semibold uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'app'
                ? 'border-theme-accent text-theme-accent'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Tablet className="w-4 h-4" />
            1. Install as App (PWA)
          </button>
          <button
            onClick={() => setActiveTab('widget')}
            className={`pb-3 px-4 font-mono text-xs font-semibold uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'widget'
                ? 'border-theme-accent text-theme-accent'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            2. Home Screen Widget
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {activeTab === 'app' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-theme-accent/[0.05] border border-theme-accent/20 text-white/80 text-xs leading-relaxed">
                <p className="font-semibold text-theme-accent mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Full-screen Standalone iOS App
                </p>
                Circuit Pro is fully optimized with Apple Touch icons, dark theme styling, and safe-area margins. No App Store download required!
              </div>

              {/* Step 1 */}
              <div className="flex gap-4 items-start p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-7 h-7 rounded-full bg-white/[0.08] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-medium text-xs">Open in Safari on iPhone or iPad</h4>
                  <p className="text-white/50 text-xs">
                    Connect your device to your local Wi-Fi network and browse to:
                  </p>
                  <div className="mt-1.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/[0.1] font-mono text-xs text-theme-accent select-all">
                    {networkUrl}
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-7 h-7 rounded-full bg-white/[0.08] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-medium text-xs flex items-center gap-1.5">
                    Tap the Share Button <Share className="w-3.5 h-3.5 text-sky-400" />
                  </h4>
                  <p className="text-white/50 text-xs">
                    In Safari’s bottom toolbar (iPhone) or top toolbar (iPad), tap the Share square icon with an upward arrow.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-7 h-7 rounded-full bg-white/[0.08] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-medium text-xs flex items-center gap-1.5">
                    Select "Add to Home Screen" <PlusSquare className="w-3.5 h-3.5 text-theme-accent" />
                  </h4>
                  <p className="text-white/50 text-xs">
                    Scroll down the share sheet and tap <strong>"Add to Home Screen"</strong>, then tap <strong>Add</strong> in the top right.
                  </p>
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-[11px] font-mono text-emerald-400">
                  ✓ Launches without Safari browser address bars, with app icon on your home screen.
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Interactive iOS Widget via Scriptable</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-white/60">Free App Store Tool</span>
                </div>
                <p className="text-white/60">
                  To get live World #1 rankings (Sinner, Sabalenka) and circuit surface telemetry as an interactive widget on your iOS home screen:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-white/70">
                  <li>Download <strong>Scriptable</strong> from the App Store on iPhone/iPad (free).</li>
                  <li>Tap the <strong>+</strong> in Scriptable to create a new script and name it <strong>Circuit Pro</strong>.</li>
                  <li>Copy and paste the script below, then save.</li>
                  <li>Long press your iOS Home Screen, tap <strong>+</strong>, search <strong>Scriptable</strong>, and add the widget!</li>
                </ol>
              </div>

              {/* Code snippet with copy button */}
              <div className="relative rounded-xl bg-black/80 border border-white/[0.1] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-white/[0.05] border-b border-white/[0.08]">
                  <span className="text-[11px] font-mono text-white/50">circuit-pro-widget.js</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-theme-accent text-black font-semibold text-xs transition-all hover:opacity-90"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Widget Code
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-[10px] font-mono text-white/70 max-h-48 overflow-y-auto no-scrollbar">
                  {WIDGET_SCRIPT}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/[0.08] bg-black/50 flex items-center justify-between">
          <span className="text-xs text-white/40 font-mono">
            Optimized for iOS 16, 17, 18 & iPadOS
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
