import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "373d919d-2a08-46b9-ac26-2638978ec8ba",
    authority:
      "https://login.microsoftonline.com/a3329a53-02fd-4abb-94cd-6d1b954419f6",
    redirectUri: "https://oando-eptw.vercel.app/social-login",
    postLogoutRedirectUri: "https://oando-eptw.vercel.app/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["user.read"],
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const handleMicrosoftRedirect = async () => {
  try {
    const response = await msalInstance.handleRedirectPromise();
    if (response) {
      // Save the access token to session storage
      sessionStorage.setItem("access_token", response.accessToken);
      console.log(response, "this is the response");
      return response.accessToken;
    }
  } catch (error) {
    console.error("Error handling redirect:", error);
  }
  return null;
};

export const initializeMsal = async () => {
  try {
    await msalInstance.initialize();
  } catch (error) {
    console.error("Error initializing MSAL:", error);
  }
};
