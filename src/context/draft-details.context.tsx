import { createContext } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";

const DraftContext = createContext(null);

// Helper function to remove circular references
function removeCircularReferences(obj) {
  const seen = new Set();
  function cleaner(obj) {
    if (obj && typeof obj === "object") {
      if (seen.has(obj)) {
        return;
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

export const DraftDetailsProvider = ({ children }) => {
  const [draft, setDraft] = useState(() => {
    const savedDraft = localStorage.getItem("draft-details");
    return savedDraft ? JSON.parse(savedDraft) : null;
  });

  const [isDraft, setIsDraft] = useState(() => {
    const savedIsDraft = localStorage.getItem("is-draft");
    return savedIsDraft === "true";
  });

  useEffect(() => {
    if (draft) {
      const cleanedDraft = removeCircularReferences(draft);
      localStorage.setItem("draft-details", JSON.stringify(cleanedDraft));
    }
  }, [draft]);

  useEffect(() => {
    localStorage.setItem("is-draft", isDraft.toString());
  }, [isDraft]);

  const updateDraft = (newDraft) => {
    setDraft(newDraft);
  };

  const updateIsDraft = (value) => {
    setIsDraft(value);
  };

  return (
    <DraftContext.Provider
      value={{ draft, updateDraft, isDraft, updateIsDraft }}
    >
      {children}
    </DraftContext.Provider>
  );
};

export const useDraftDetails = () => {
  return useContext(DraftContext);
};
