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

const toOriginalFormat = (documents) => {
  const toOriginalName = (str) => {
    return str
      .replace(/([A-Z])/g, " $1") // Add spaces before capital letters
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Handle edge cases for camelCase
      .replace(/^./, (match) => match.toUpperCase()) // Capitalize the first letter
      .replace(/Cert$/, " Cert") // Add a space for "Cert"
      .replace(/Doc$/, " Doc") // Add a space for "Doc"
      .trim();
  };

  const result = [];

  for (const [key, value] of Object.entries(documents)) {
    if (key.endsWith("Type") || key.endsWith("Doc")) {
      const baseKey = key.replace(/Type$|Doc$/, "");
      const originalName = toOriginalName(baseKey);

      // Handle cases with `otherCertName`
      if (key === "otherCertName") {
        result.push({
          name: "Other Cert",
          type: documents["otherCertType"],
          doc: documents["otherCert"],
          otherCertName: value,
        });
      } else if (!result.some((doc) => doc.name === originalName)) {
        result.push({
          name: originalName,
          type: documents[`${baseKey}Type`] || null,
          doc: documents[`${baseKey}Doc`] || null,
        });
      }
    }
  }

  return result.filter((doc) => doc.type || doc.doc);
};

function extractFileName(data) {
  const url = data;

  if (!url) {
    throw new Error("URL is required.");
  }

  const segments = url.split("/");
  const fileName = segments[segments.length - 1];

  const name = fileName.split("-").slice(1).join("-");

  return name;
}

const PERMISSIONS = [
  { label: "Full Access", value: "FULL_ACCESS" },
  { label: "Create Permit", value: "CREATE_PERMIT" },
  { label: "Process Permit", value: "PROCESS_PERMIT" },
  { label: "Delete User", value: "DELETE_USER" },
  { label: "Create Internal User", value: "CREATE_INTERNAL_USER" },
  { label: "Edit Internal User", value: "EDIT_INTERNAL_USER" },
  { label: "Create External User", value: "CREATE_EXTERNAL_USER" },
  { label: "Edit External User", value: "EDIT_EXTERNAL_USER" },
  { label: "Create Role", value: "CREATE_ROLE" },
  { label: "Edit Role", value: "EDIT_ROLE" },
  { label: "Create Location", value: "CREATE_LOCATION" },
  { label: "Edit Location", value: "EDIT_LOCATION" },
  { label: "Create Company", value: "CREATE_COMPANY" },
  { label: "Edit Company", value: "EDIT_COMPANY" },
] as const;

const AUTHORITIES = [
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

export {
  randomHash,
  capitalize,
  createParams,
  toOriginalFormat,
  extractFileName,
  PERMISSIONS,
  AUTHORITIES,
};
