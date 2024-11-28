import { createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { useMachine } from "@xstate/react";
import IssuingSupervisorRevalidationMachine from "../machines/issuing-supervisor-revalidation";

const Context = createContext({} as any);

function IssuingRevalidationProvider({ children }) {
  const [state, send, service] = useMachine(
    IssuingSupervisorRevalidationMachine
  );

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

function useIssuingSupervisorRevalidationContext() {
  return useContext(Context);
}

export { IssuingRevalidationProvider, useIssuingSupervisorRevalidationContext };
