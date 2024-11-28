import { createMachine } from "xstate";
import { randomHash } from "../assets/utils";

const RoleMachine = createMachine({
  context: {
    role: "",
    role_id: randomHash(8),
  },
  predictableActionArguments: true,
  initial: "role",
  states: {
    role: {},
  },
});

export default RoleMachine;
