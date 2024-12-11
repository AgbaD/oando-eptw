import DateFilter from "../../ui/date/date-filter";
import Button from "../../ui/button";
import Icon from "../../ui/icon";

export default function Stats({ metrics }) {
  return (
    <div className="app-overview__stats">
      <div className="app-overview__stats__header">
        <div className="hide-display-mobile">
          <h3 className="app-overview__stats__title">Permit Metrics</h3>
          <DateFilter />
        </div>

        <Button href="/permit/create" variant="primary">
          <Icon name="plus" /> Create Permit
        </Button>

        <div className="hide-display-web permit">
          <h3 className="app-overview__stats__title">Permit Metrics</h3>
          <DateFilter />
        </div>
      </div>

      <div className="app-overview__stats__wrapper">
        <div className="app-overview__stats__stat">
          {/* prettier-ignore */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="#F2B300" fill-opacity="0.1"/>
          <path d="M24.19 10H15.81C12.17 10 10 12.17 10 15.81V24.19C10 27.83 12.17 30 15.81 30H24.19C27.83 30 30 27.83 30 24.19V15.81C30 12.17 27.83 10 24.19 10ZM17.97 22.9L15.72 25.15C15.57 25.3 15.38 25.37 15.19 25.37C15 25.37 14.8 25.3 14.66 25.15L13.91 24.4C13.61 24.11 13.61 23.63 13.91 23.34C14.2 23.05 14.67 23.05 14.97 23.34L15.19 23.56L16.91 21.84C17.2 21.55 17.67 21.55 17.97 21.84C18.26 22.13 18.26 22.61 17.97 22.9ZM17.97 15.9L15.72 18.15C15.57 18.3 15.38 18.37 15.19 18.37C15 18.37 14.8 18.3 14.66 18.15L13.91 17.4C13.61 17.11 13.61 16.63 13.91 16.34C14.2 16.05 14.67 16.05 14.97 16.34L15.19 16.56L16.91 14.84C17.2 14.55 17.67 14.55 17.97 14.84C18.26 15.13 18.26 15.61 17.97 15.9ZM25.56 24.62H20.31C19.9 24.62 19.56 24.28 19.56 23.87C19.56 23.46 19.9 23.12 20.31 23.12H25.56C25.98 23.12 26.31 23.46 26.31 23.87C26.31 24.28 25.98 24.62 25.56 24.62ZM25.56 17.62H20.31C19.9 17.62 19.56 17.28 19.56 16.87C19.56 16.46 19.9 16.12 20.31 16.12H25.56C25.98 16.12 26.31 16.46 26.31 16.87C26.31 17.28 25.98 17.62 25.56 17.62Z" fill="#F2B300"/>
          </svg>

          <p>All Permits</p>
          <h4>{metrics?.allPermitCount ?? 0}</h4>
        </div>

        <div className="app-overview__stats__stat">
          {/* prettier-ignore */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="#FFEFE4"/>
          <path d="M28.5 18.19H25.61C23.24 18.19 21.31 16.26 21.31 13.89V11C21.31 10.45 20.86 10 20.31 10H16.07C12.99 10 10.5 12 10.5 15.57V24.43C10.5 28 12.99 30 16.07 30H23.93C27.01 30 29.5 28 29.5 24.43V19.19C29.5 18.64 29.05 18.19 28.5 18.19Z" fill="#E86E18"/>
          <path d="M23.8 10.21C23.39 9.79999 22.68 10.08 22.68 10.65V14.14C22.68 15.6 23.92 16.81 25.43 16.81C26.38 16.82 27.7 16.82 28.83 16.82C29.4 16.82 29.7 16.15 29.3 15.75C27.86 14.3 25.28 11.69 23.8 10.21Z" fill="#E86E18"/>
          </svg>

          <p>Drafts</p>
          <h4>{metrics?.allDraftCount ?? 0}</h4>
        </div>

        <div className="app-overview__stats__stat">
          {/* prettier-ignore */}
          <div className="purple-container">
            <img src="/svgs/document-normal.svg" alt=""/>
          </div>
          <p>Ongoing</p>
          <h4>{metrics?.ongoingPermitCount ?? 0}</h4>
        </div>

        <div className="app-overview__stats__stat">
          {/* prettier-ignore */}
          <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20.3333" cy="20" r="20" fill="#DFF2EA"/>
          <path d="M22.6833 10H17.9833C16.9433 10 16.0933 10.84 16.0933 11.88V12.82C16.0933 13.86 16.9333 14.7 17.9733 14.7H22.6833C23.7233 14.7 24.5633 13.86 24.5633 12.82V11.88C24.5733 10.84 23.7233 10 22.6833 10Z" fill="#008D4E"/>
          <path d="M25.5733 12.82C25.5733 14.41 24.2733 15.71 22.6833 15.71H17.9833C16.3933 15.71 15.0933 14.41 15.0933 12.82C15.0933 12.26 14.4933 11.91 13.9933 12.17C12.5833 12.92 11.6233 14.41 11.6233 16.12V25.53C11.6233 27.99 13.6333 30 16.0933 30H24.5733C27.0333 30 29.0433 27.99 29.0433 25.53V16.12C29.0433 14.41 28.0833 12.92 26.6733 12.17C26.1733 11.91 25.5733 12.26 25.5733 12.82ZM23.6733 20.73L19.6733 24.73C19.5233 24.88 19.3333 24.95 19.1433 24.95C18.9533 24.95 18.7633 24.88 18.6133 24.73L17.1133 23.23C16.8233 22.94 16.8233 22.46 17.1133 22.17C17.4033 21.88 17.8833 21.88 18.1733 22.17L19.1433 23.14L22.6133 19.67C22.9033 19.38 23.3833 19.38 23.6733 19.67C23.9633 19.96 23.9633 20.44 23.6733 20.73Z" fill="#008D4E"/>
          </svg>
          <p>Closed</p>
          <h4>{metrics?.closedPermitsCount ?? 0}</h4>
        </div>
      </div>
    </div>
  );
}
