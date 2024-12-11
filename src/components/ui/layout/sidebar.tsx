import { Link, useRouter } from "preact-router";
import Match from "preact-router/match";
import Icon from "../icon";
import { useUserContext } from "../../../context/user.context";
import { useEffect, useState } from "preact/hooks";

import { createRequest } from "../../../assets/api";

export default function Sidebar() {
  const { profile } = useUserContext();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const getProfilePermissions = async () => {
      try {
        const response = await createRequest(`/profile/${profile.id}`, "GET");
        setPermissions(response[0].data.role.permissions);
      } catch (error) {
        console.log(error);
      }
    };

    getProfilePermissions();
  }, [profile]);

  const filterRoutes = () => {
    if (profile?.type === "EXTERNAL") {
      // External users can only see Permit Management, Profile, and Logout
      return [ROUTES[1], ROUTES[3], ROUTES[4]];
    }

    if (profile?.type === "INTERNAL") {
      if (permissions.includes("FULL_ACCESS")) {
        // Internal users with FULL_ACCESS can see everything
        return ROUTES;
      }

      // Filter routes based on specific permissions
      return ROUTES.map((group) => {
        const filteredPages = group.pages.filter((page) => {
          if (
            page.path.startsWith("/roles") &&
            permissions.includes("CREATE_ROLE")
          ) {
            return true;
          }
          if (
            page.path.startsWith("/locations") &&
            permissions.includes("CREATE_LOCATION")
          ) {
            return true;
          }
          if (
            page.path.startsWith("/users") &&
            permissions.some((perm) =>
              [
                "CREATE_INTERNAL_USER",
                "CREATE_EXTERNAL_USER",
                "CREATE_COMPANY",
                "EDIT_INTERNAL_USER",
                "EDIT_EXTERNAL_USER",
                "EDIT_COMPANY",
                "DELETE USER",
              ].includes(perm)
            )
          ) {
            return true;
          }
          if (
            page.path.startsWith("/permit") &&
            permissions.some((perm) =>
              ["CREATE_PERMIT", "PROCESS PERMIT"].includes(perm)
            )
          ) {
            return true;
          }
          return ["/profile", ""].includes(page.path); // Always include Profile and Logout
        });

        return filteredPages.length > 0
          ? { ...group, pages: filteredPages }
          : null;
      }).filter(Boolean); // Remove empty groups
    }

    return [];
  };

  const filteredRoutes = filterRoutes();

  return (
    <div className="app-layout__sidebar">
      <div className="app-layout__sidebar__logo">
        <img src="/svgs/logo.sidebar.svg" />
      </div>

      <div className="app-layout__sidebar__nav">
        {filteredRoutes.map((group) => (
          <div
            className="app-layout__sidebar__nav__links"
            key={group.title || "untitled-group"}
          >
            {group.title ? <p>{group.title}</p> : null}

            {group.pages.map((page) => (
              <NavLink {...{ page }} key={page.path} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function NavLink({ page }) {
  const [{ url }] = useRouter();
  const { logout } = useUserContext();
  const isHomePage = page.path === "/";

  if (!page.path) {
    return (
      <button onClick={logout}>
        <div className="icons-container">
          <div className="icons">
            <Icon name={page.iconName} />
            <Icon name={page.iconName} />
          </div>
        </div>
        {page.label}
      </button>
    );
  }

  return (
    <Match path={page.path}>
      {({ matches }) => (
        <Link
          className={
            matches || (url.startsWith(page.path) && !isHomePage)
              ? "active"
              : "inactive"
          }
          href={page.path}
        >
          <div className="icons-container">
            <div className="icons">
              <Icon name={page.iconName} />
              <Icon name={page.iconName} />
            </div>
          </div>

          {page.label}
        </Link>
      )}
    </Match>
  );
}

const ROUTES = [
  {
    title: "",
    pages: [
      {
        path: "/",
        label: "Overview",
        iconName: "sidebar.overview",
      },
      {
        path: "/audits",
        label: "Audits",
        iconName: "sidebar.activity",
      },
      {
        path: "/analytics",
        label: "Analytics & Reports",
        iconName: "sidebar.reports",
      },
    ],
  },
  {
    title: "Permit Management",
    pages: [
      {
        path: "/permit-drafts",
        label: "Drafts",
        iconName: "sidebar.draft",
      },
      {
        path: "/permit-workflows",
        label: "Workflow",
        iconName: "sidebar.permit",
      },
      {
        path: "/permit-activities",
        label: "Activities",
        iconName: "sidebar.permit-renewals",
      },
      {
        path: "/permit-monitoring",
        label: "Monitoring",
        iconName: "sidebar.work-suspension",
      },
      {
        path: "/permit-storage",
        label: "Storage",
        iconName: "sidebar.work-completion",
      },
    ],
  },
  {
    title: "User Management",
    pages: [
      {
        path: "/roles",
        label: "Roles & Permissions",
        iconName: "sidebar.roles",
      },
      {
        path: "/locations",
        label: "Locations",
        iconName: "sidebar.location",
      },
      {
        path: "/users",
        label: "Users",
        iconName: "sidebar.users",
      },
    ],
  },
  {
    title: "",
    pages: [
      {
        path: "/profile",
        label: "Profile",
        iconName: "sidebar.profile",
      },
    ],
  },
  {
    title: "",
    pages: [
      {
        path: "",
        label: "Logout",
        iconName: "sidebar.logout",
      },
    ],
  },
];
