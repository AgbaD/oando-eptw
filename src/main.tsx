import { render } from "preact";
import App from "./app.tsx";

import { msalInstance } from "./msal-auth-config.ts";
import { EventType } from "@azure/msal-browser";

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

    console.log(account, "this is the account");
  }
});

render(<App instance={msalInstance} />, document.getElementById("app")!);
