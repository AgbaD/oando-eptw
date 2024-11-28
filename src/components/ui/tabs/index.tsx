import "./index.scss";

export default function Tabs({ tabs, counts = {} }) {
  return (
    <div className="base-tabs">
      {tabs.map((tab) => (
        <button data-isActive={tab.isActive} onClick={tab.onClick}>
          {tab.label}
          {counts[tab.key] ? <span>{counts[tab.key]}</span> : null}
        </button>
      ))}
    </div>
  );
}
