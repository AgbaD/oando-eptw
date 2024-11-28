import { createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { useMachine } from "@xstate/react";
import ApprovePermitMachine from "../machines/approve-permit.machine";

const Context = createContext({} as any);

function ApprovePermitProvider({ children }) {
  const [state, send, service] = useMachine(ApprovePermitMachine);

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

function usePermitApprovalContext() {
  return useContext(Context);
}

export { ApprovePermitProvider, usePermitApprovalContext };
