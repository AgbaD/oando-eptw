import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";

const RoleContext = createContext({} as any);

function RoleProvider({ children }) {
  const [currentRole, setCurrentRole] = useState("issuingAuth"); // Default role
  const changeRole = (role) => setCurrentRole(role);

  return (
    <RoleContext.Provider value={{ currentRole, changeRole }}>
      {children}
    </RoleContext.Provider>
  );
}

function useRoleContext() {
  return useContext(RoleContext);
}

export { RoleProvider, useRoleContext };
