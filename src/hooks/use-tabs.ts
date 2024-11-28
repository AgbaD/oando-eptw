import { useState } from "preact/hooks";

export default function useTabs(tabs: string[], defaultTab = tabs[0]) {
  const [activeTab, switchTab] = useState(defaultTab);

  const decoratedTabs = tabs.map((t) => ({
    key: t,
    label: t,
    isActive: activeTab === t,
    onClick: () => switchTab(t),
  }));

  return {
    switchTab,
    activeTab,
    tabs: decoratedTabs,
  };
}
