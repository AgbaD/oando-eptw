import "./index.scss";

export default function ReusableTabs({ tabs, counts = {}, className = "" }) {
  return (
    <div className={className}>
      {tabs.map((tab) => (
        <button data-isActive={tab.isActive} onClick={tab.onClick}>
          {tab.label}
          {counts[tab.key] ? <span>{counts[tab.key]}</span> : null}
        </button>
      ))}
    </div>
  );
}
