import { createContext } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";

const PermitContext = createContext(null);

// Helper function to remove circular references
function removeCircularReferences(obj) {
  const seen = new Set();
  function cleaner(obj) {
    if (obj && typeof obj === "object") {
      if (seen.has(obj)) {
        return; // Prevent circular reference by returning undefined
      }
      seen.add(obj);
      Object.keys(obj).forEach((key) => {
        obj[key] = cleaner(obj[key]);
      });
    }
    return obj;
  }
  return cleaner(obj);
}

export const PermitDetailsProvider = ({ children }) => {
  const [permit, setPermit] = useState(() => {
    const savedPermit = localStorage.getItem("permit-details");
    return savedPermit ? JSON.parse(savedPermit) : null;
  });

  useEffect(() => {
    if (permit) {
      // Remove circular references before saving to localStorage
      const cleanedPermit = removeCircularReferences(permit);
      localStorage.setItem("permit-details", JSON.stringify(cleanedPermit));
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
