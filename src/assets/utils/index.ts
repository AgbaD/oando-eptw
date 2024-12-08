function shuffle(str: string) {
  let j, temp, i;
  let a = str.split("");

  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a.join("");
}

const randomHash = (length: number): string => {
  let result = "";
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charsLen = chars.length;

  chars = shuffle(chars);

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLen));
  }

  return result;
};

function capitalize(str: string) {
  if (!str) return "-";

  return str
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
}

function createParams(payload: any) {
  const params = new URLSearchParams();
  Object.keys(payload).map((key) => {
    if (typeof payload[key] === "string") {
      payload[key] = `${payload[key]}`.trim();
    }

    if (payload[key]) {
      params.set(key, payload[key]);
    }
  });
  return params;
}

const PERMISSIONS = [
  { label: "Full Access", value: "FULL_ACCESS" },
  { label: "Platform Access", value: "PLATFORM_ACCESS" },
  { label: "Create Permit", value: "CREATE_PERMIT" },
  { label: "Process Permit", value: "PROCESS_PERMIT" },
  { label: "Create User", value: "CREATE_USER" },
  { label: "Edit User", value: "EDIT_USER" },
  // { label: "Delete User", value: "DELETE_USER" },
  { label: "Create Role", value: "CREATE_ROLE" },
  { label: "Edit Role", value: "EDIT_ROLE" },
  { label: "Delete user Role", value: "DELETE_USER_ROLE" },
  { label: "Create Location", value: "CREATE_LOCATION" },
  { label: "Edit Location", value: "EDIT_LOCATION" },
  { label: "Delete Location", value: "DELETE_LOCATION" },
  { label: "PTW Access", value: "PTW_ACCESS" },
  { label: "Process Existing Permit", value: "PROCESS_EXISTING_PERMIT" },
  { label: "Internal Task Responsible", value: "INTERNAL_TASK_RESPONSIBLE" },
  { label: "External Task Responsible", value: "EXTERNAL_TASK_RESPONSIBLE" },
  { label: "Attach Documents", value: "ATTACH_DOCUMENTS" },
] as const;

const AUTHORITIES = [
  { label: "Super Admin", value: "SUPER_ADMIN" },
  { label: "Performing Authority", value: "PERFORMING" },
  { label: "Issuing Authority", value: "ISSUING" },
  { label: "HSE Authority", value: "HSE" },
  { label: "Authorizing Authority", value: "AUTHORIZING" },
  {
    label: "Performing Authorizing Supervisor",
    value: "PERFORMING_SUPERVISOR",
  },
  { label: "Safety Officer", value: "SAFETY_OFFICER" },
  { label: "Issuing Authorizing Supervisor", value: "ISSUING_SUPERVISOR" },
] as const;

export { randomHash, capitalize, createParams, PERMISSIONS, AUTHORITIES };
