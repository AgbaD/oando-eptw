import { createContext } from "preact";
import { useContext, useState, useMemo } from "preact/hooks";

const IDContext = createContext({} as any);

function IDProvider({ children }: any) {
  // Load initial  ID from local storage, ensuring it's parsed as a number or defaulting to null
  const defaultId = useMemo(() => {
    try {
      const storedID = localStorage.getItem("id");
      return storedID ? Number(storedID) : null;
    } catch {
      return null;
    }
  }, []);

  const [valueID, setId] = useState<number | null>(defaultId);

  // Function to update ID both in state and local storage, ensuring it is a number
  function setID(id: number) {
    if (typeof id === "number" && !isNaN(id)) {
      localStorage.setItem("id", String(id));
      setId(id);
    } else {
      console.warn("ID must be a valid number");
    }
  }

  // Clear  data from local storage and state
  function clearID() {
    localStorage.removeItem("id");
    setId(null);
  }

  return (
    <IDContext.Provider value={{ valueID, setID, clearID }}>
      {children}
    </IDContext.Provider>
  );
}

function useIDContext() {
  return useContext(IDContext);
}

export { IDProvider, useIDContext };
