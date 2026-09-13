// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: trophy;
/**
 * Circuit Pro - iOS Home Screen Widget (iPhone & iPad)
 * Displays Live World #1s, Active Surface, and Circuit Radar.
 * Run in the Scriptable app on iOS / iPadOS.
 */

const widget = new ListWidget();
widget.backgroundColor = new Color("#07080b");

// Header row
const headerStack = widget.addStack();
headerStack.layoutHorizontally();
headerStack.centerAlignContent();

const logoText = headerStack.addText("CIRCUIT PRO");
logoText.font = Font.boldSystemFont(11);
logoText.textColor = new Color("#ffffff");

headerStack.addSpacer();

const badgeText = headerStack.addText("2026 LIVE");
badgeText.font = Font.boldMonospacedSystemFont(9);
badgeText.textColor = new Color("#ccff00");

widget.addSpacer(8);

// Divider line
const line = widget.addStack();
line.size = new Size(0, 1);
line.backgroundColor = new Color("#ffffff", 0.15);

widget.addSpacer(8);

// ATP Section
const atpStack = widget.addStack();
atpStack.layoutHorizontally();
atpStack.centerAlignContent();

const atpTag = atpStack.addText("ATP #1 ");
atpTag.font = Font.boldMonospacedSystemFont(10);
atpTag.textColor = new Color("#38bdf8");

const atpName = atpStack.addText("Jannik Sinner");
atpName.font = Font.semiboldSystemFont(12);
atpName.textColor = new Color("#f1f5f9");

atpStack.addSpacer();

const atpPts = atpStack.addText("13,450 pts");
atpPts.font = Font.monospacedDigitSystemFont(10);
atpPts.textColor = new Color("#94a3b8");

widget.addSpacer(6);

// WTA Section
const wtaStack = widget.addStack();
wtaStack.layoutHorizontally();
wtaStack.centerAlignContent();

const wtaTag = wtaStack.addText("WTA #1 ");
wtaTag.font = Font.boldMonospacedSystemFont(10);
wtaTag.textColor = new Color("#f472b6");

const wtaName = wtaStack.addText("Aryna Sabalenka");
wtaName.font = Font.semiboldSystemFont(12);
wtaName.textColor = new Color("#f1f5f9");

wtaStack.addSpacer();

const wtaPts = wtaStack.addText("8,575 pts");
wtaPts.font = Font.monospacedDigitSystemFont(10);
wtaPts.textColor = new Color("#94a3b8");

widget.addSpacer(8);

// Surface Dynamics Footer
const footerStack = widget.addStack();
footerStack.layoutHorizontally();
footerStack.centerAlignContent();

const dot = footerStack.addText("● ");
dot.font = Font.systemFont(8);
dot.textColor = new Color("#3b82f6");

const surfaceText = footerStack.addText("Hard Court Season");
surfaceText.font = Font.systemFont(9);
surfaceText.textColor = new Color("#64748b");

footerStack.addSpacer();

const radarText = footerStack.addText("Telemetry Online");
radarText.font = Font.systemFont(9);
radarText.textColor = new Color("#22c55e");

// Finish widget configuration
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();
