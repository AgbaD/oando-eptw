import { createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { useMachine } from "@xstate/react";

import ActivityAuthorizingMachine from "../machines/authorizing-activity-machine";

const Context = createContext({} as any);

function PermitProvider({ children }) {
  const [state, send, service] = useMachine(ActivityAuthorizingMachine);

  useEffect(() => {
    const subscription = service.subscribe(() => window.scroll(0, 0));
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Context.Provider value={{ state, send }}>{children}</Context.Provider>
  );
}

function useAuthorizingActivityContext() {
  return useContext(Context);
}

export { PermitProvider, useAuthorizingActivityContext };
