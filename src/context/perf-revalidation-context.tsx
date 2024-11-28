import { createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { useMachine } from "@xstate/react";
import PerfRevalidationMachine from "../machines/perf-auth-revalidation-machine";

const Context = createContext({} as any);

function RevalidationProvider({ children }) {
  const [state, send, service] = useMachine(PerfRevalidationMachine);

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

function usePerfRevalidationContext() {
  return useContext(Context);
}

export { RevalidationProvider, usePerfRevalidationContext };
