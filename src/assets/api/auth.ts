import { createRequest } from ".";

function login(data) {
  return createRequest("/auth/login", "post", data);
}

function forgotPassword(data) {
  return createRequest("/auth/forgot-password", "post", data);
}

function verifyForgotPasswordOtp(data) {
  return createRequest("/auth/forgot-password/verify", "post", data);
}

function resetPassword(data) {
  return createRequest("/auth/forgot-password/reset", "post", data);
}

function onboardContractor(data) {
  return createRequest("/auth/contractor/onboard", "post", data);
}

function verifyContractorOnboarding(data) {
  return createRequest("/auth/contractor/verify", "post", data);
}

export {
  login,
  forgotPassword,
  verifyForgotPasswordOtp,
  resetPassword,
  onboardContractor,
  verifyContractorOnboarding
};
