import { LogLevel } from "@azure/msal-browser";

/**
 * Generate a random code verifier
 */
// function generateCodeVerifier() {
//   const array = new Uint32Array(32);
//   window.crypto.getRandomValues(array);
//   return Array.from(array, (num) => num.toString(36))
//     .join("")
//     .slice(0, 128);
// }

/**
 * Generate a code challenge based on a code verifier
 * @param {string} codeVerifier
 * @returns {Promise<string>}
 */
// async function generateCodeChallenge(codeVerifier) {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(codeVerifier);
//   const digest = await window.crypto.subtle.digest("SHA-256", data);
//   return btoa(String.fromCharCode(...new Uint8Array(digest)))
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
// }

/**
 * Generate and store code verifier and challenge
 */
// async function initializePKCE() {
//   const codeVerifier = generateCodeVerifier();
//   const codeChallenge = await generateCodeChallenge(codeVerifier);

//   // Store the verifier in session storage to use during token exchange
//   // sessionStorage.setItem("code_verifier", codeVerifier);

//   return codeChallenge;
// }

/**
 * Configuration object to be passed to MSAL instance on creation.
 */
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
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["user.read", "openid", "email"],
  // codeChallenge: "",
  // codeChallengeMethod: "",
};

/**
 * Example usage: Before initiating login, generate the code challenge
 */
// (async () => {
//   const codeChallenge = await initializePKCE();
//   console.log("Code Challenge:", codeChallenge);

//   // Add the code challenge to your login request
//   loginRequest.codeChallenge = codeChallenge;
//   loginRequest.codeChallengeMethod = "S256"; // PKCE method
// })();
