import Icon from "../../ui/icon";

export default function PendingActions() {
  return (
    <div className="app-overview__actions">
      <div className="app-overview__actions__header">
        {/* prettier-ignore */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.39 15.67L13.35 12H10.64L6.60001 15.67C5.47001 16.69 5.10001 18.26 5.65001 19.68C6.20001 21.09 7.54001 22 9.05001 22H14.94C16.46 22 17.79 21.09 18.34 19.68C18.89 18.26 18.52 16.69 17.39 15.67ZM13.82 18.14H10.18C9.80001 18.14 9.50001 17.83 9.50001 17.46C9.50001 17.09 9.81001 16.78 10.18 16.78H13.82C14.2 16.78 14.5 17.09 14.5 17.46C14.5 17.83 14.19 18.14 13.82 18.14Z" fill="#F2B300"/>
        <path d="M18.35 4.32C17.8 2.91 16.46 2 14.95 2H9.05001C7.54001 2 6.20001 2.91 5.65001 4.32C5.11001 5.74 5.48001 7.31 6.61001 8.33L10.65 12H13.36L17.4 8.33C18.52 7.31 18.89 5.74 18.35 4.32ZM13.82 7.23H10.18C9.80001 7.23 9.50001 6.92 9.50001 6.55C9.50001 6.18 9.81001 5.87 10.18 5.87H13.82C14.2 5.87 14.5 6.18 14.5 6.55C14.5 6.92 14.19 7.23 13.82 7.23Z" fill="#F2B300"/>
        </svg>
        Pending actions
      </div>

      {[...Array(3)].map((_, i) => (
        <div key={i} className="app-overview__action">
          <div>
            <p>10 permit approvals</p>
            <span>3 days ago</span>
          </div>

          <Icon name="diagonal-arrow" />
        </div>
      ))}
    </div>
  );
}
