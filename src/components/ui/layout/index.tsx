import { useState } from "preact/hooks";
import Sidebar from "./sidebar";
import "./index.scss";

import Icon from "../icon";

export default function AppLayout({ children }: any) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="app-layout">
      <div className="">
        <div className="">
          <div className="menu-toggle">
            {isSidebarVisible ? (
              <button onClick={toggleSidebar} className="toggle-button">
                <Icon name="x" />
              </button>
            ) : (
              <img
                src={"/svgs/menu.svg"}
                onClick={toggleSidebar}
                alt={"menu"}
                title={"menu"}
                className="toggle-button"
              />
            )}
          </div>
        </div>

        <div
          className={`${
            isSidebarVisible
              ? "app-layout--sidebar-visible"
              : "app-layout--sidebar-hidden"
          }`}
        >
          <Sidebar />
        </div>
      </div>

      <div className="app-layout__content">{children}</div>
    </div>
  );
}
