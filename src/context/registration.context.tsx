import { createContext } from "preact";
import { useMachine } from "@xstate/react";
import RegistrationMachine from "../machines/registration.machine";
import { useContext } from "preact/hooks";

const Context = createContext({} as any);

function RegistrationProvider({ children }) {
  const [state, send] = useMachine(RegistrationMachine);

  return (
    <Context.Provider value={{ state, send }}>{children}</Context.Provider>
  );
}

function useRegistrationContext() {
  return useContext(Context);
}

export { RegistrationProvider, useRegistrationContext };
