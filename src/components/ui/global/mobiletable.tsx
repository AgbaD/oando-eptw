const ReusableMobileTable = ({
  data,
  onItemClick,
  formatCreatedAt,
  getName,
  getDetails,
  type,
}) => {
  return (
    <div className={`app-section__sm-table ${type}`}>
      <div>
        {data?.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className="container"
          >
            {type === "Locations" && (
              <>
                <div className="location-flex">
                  <span>Location Admin</span>
                  <h2>{getName(item.site)}</h2>
                </div>
                <h2>{item.address}</h2>
                <div className="location-flex">
                  <p>
                    <span>Location(s): </span>
                    {item.state}
                  </p>
                  <p>
                    <span>Total Members:</span> {item.members.length}
                  </p>
                </div>
              </>
            )}
            {type === "Default" && (
              <>
                <div className="container-item">
                  <h2>{getName(item)}</h2>
                  <span>{formatCreatedAt(item.createdAt)}</span>
                </div>
                <p>{getDetails(item)}</p>
              </>
            )}
            {type === "Users" && (
              <>
                <div className="location-flex">
                  <h2>{getName(item)}</h2>
                </div>
                <span>{item.contractId}</span>
                <div className="location-flex">
                  <p className={``}>
                    <span>Status:</span> •{" "}
                    <span
                      className={` ${
                        item.status === "ACTIVE"
                          ? "mobile-status-active"
                          : "mobile-status-inactive"
                      }`}
                    >
                      {" "}
                      {data.isActive === true ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>
              </>
            )}
            {type === "Company" && (
              <>
                <div className="location-flex">
                  <h2>{getName(item)}</h2>
                </div>
                <span>{item.contractId}</span>
                <div className="location-flex">
                  <p className={``}>
                    <span>Members:</span> • <span>4</span>
                  </p>
                  <p className={``}>
                    <span>Status:</span> •{" "}
                    <span
                      className={` ${
                        item.status === "ACTIVE"
                          ? "mobile-status-active"
                          : "mobile-status-inactive"
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReusableMobileTable;
