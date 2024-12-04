import { render } from "preact";
import App from "./app.tsx";

import { msalConfig } from "./msal-auth-config.ts";
import { PublicClientApplication, EventType } from "@azure/msal-browser";

export const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
  if (
    event.eventType === EventType.LOGIN_SUCCESS &&
    (event.payload as any).account
  ) {
    const account = (event.payload as any).account;
    msalInstance.setActiveAccount(account);
  }
});

render(<App instance={msalInstance} />, document.getElementById("app")!);
