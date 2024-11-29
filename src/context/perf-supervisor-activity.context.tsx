import { createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { useMachine } from "@xstate/react";

import ActivityPerfSupervisorMachine from "../machines/perf-supervisor-activity";

const Context = createContext({} as any);

function PermitProvider({ children }) {
  const [state, send, service] = useMachine(ActivityPerfSupervisorMachine);

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

function usePerfSupervisorActivityContext() {
  return useContext(Context);
}

export { PermitProvider, usePerfSupervisorActivityContext };
