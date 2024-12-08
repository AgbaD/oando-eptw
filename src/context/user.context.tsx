import { createContext } from "preact";
import { route } from "preact-router";
import { useContext, useMemo, useState } from "preact/hooks";

const Context = createContext({} as any);

function UserProvider({ children }: any) {
  const defaultProfile = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("auth_profile"));
    } catch {
      return null;
    }
  }, []);

  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [profile, setProfile] = useState(defaultProfile);
  const isAuthenticated = Boolean(token);

  function login(data) {
    if (data?.token) {
      localStorage.setItem("auth_token", data?.token);
      setToken(data.token);
    }
    if (data?.profile) {
      localStorage.setItem("auth_profile", JSON.stringify(data.profile));
      setProfile(data.profile);
    }
    route("/select-permit-role");
  }

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_profile");
    setToken("");
    setProfile("");
    route("/login");
  }

  return (
    <Context.Provider value={{ login, logout, profile, isAuthenticated }}>
      {children}
    </Context.Provider>
  );
}

function useUserContext() {
  return useContext(Context);
}

export { UserProvider, useUserContext };
