import { createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { useMachine } from "@xstate/react";

import ActivityIssuingSupervisorMachine from "../machines/process-permit/issuing-supervisor-activity.machine";

const Context = createContext({} as any);

function PermitProvider({ children }) {
  const [state, send, service] = useMachine(ActivityIssuingSupervisorMachine);

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

function useIssuingSupervisorActivityContext() {
  return useContext(Context);
}

export { PermitProvider, useIssuingSupervisorActivityContext };
