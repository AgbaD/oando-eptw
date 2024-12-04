import { createContext } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";

const PermitContext = createContext(null);

export const PermitDetailsProvider = ({ children }) => {
  const [permit, setPermit] = useState(() => {
    const savedPermit = localStorage.getItem("permit-details");
    return savedPermit ? JSON.parse(savedPermit) : null;
  });

  useEffect(() => {
    if (permit) {
      localStorage.setItem("permit-details", JSON.stringify(permit));
    }
  }, [permit]);

  const updatePermit = (newPermit) => {
    setPermit(newPermit);
  };

  return (
    <PermitContext.Provider value={{ permit, updatePermit }}>
      {children}
    </PermitContext.Provider>
  );
};

export const usePermitDetails = () => {
  return useContext(PermitContext);
};
