import { createRequest } from ".";
import { createParams } from "../utils";

function createPermit({ permit_type, ...data }) {
  return createRequest(`/permit/`, "POST", data);
}

function createDraft(data) {
  return createRequest(`/permit/draft`, "POST", data);
}

function getPermits(data: any) {
  return createRequest(`/permit?${createParams(data)}`, "GET");
}

function getPermit({ id }) {
  return createRequest(`/permit/${id}`, "GET");
}

function approveIssuingAuth(data) {
  return createRequest("/permit/approve/issuing-auth", "POST", data);
}

function rejectIssuingAuth(data) {
  return createRequest("/permit/reject/issuring", "PUT", data);
}

function approveHseAuth(data) {
  return createRequest("/permit/approve/hse-auth", "POST", data);
}

function rejectHseAuth(data) {
  return createRequest("/permit/reject/hse", "PUT", data);
}

function approveAuthorizingAuth(data) {
  return createRequest("/permit/approve/authorizing-auth", "POST", data);
}

function approveIssuingSupervisor(data) {
  return createRequest("/permit/approve/issuing-auth-supervisor", "POST", data);
}

function rejectAuthorizingAuth(data) {
  return createRequest("/permit/reject/authorizing", "PUT", data);
}

function approvePerfSupervisor(data) {
  return createRequest(
    "/permit/approve/performing-auth-supervisor",
    "POST",
    data
  );
}

function approveRevalidationPerfSupervisor(data) {
  return createRequest(
    "/permit/revalidation/approve/performing-auth-supervisor",
    "POST",
    data
  );
}

function approveSafetyOfficer(data) {
  return createRequest("/permit/approve/safety-officer", "POST", data);
}

function approveRevalidationSafetyOfficer(data) {
  return createRequest(
    "/permit/revalidation/approve/safety-officer",
    "POST",
    data
  );
}

function renewPermit(data) {
  return createRequest("/permit/renewal", "POST", data);
}

function AddOnsiteNote(data) {
  return createRequest("/permit/notes", "POST", data);
}

function suspendPermit(data) {
  return createRequest("/permit/suspend", "PUT", data);
}

function cancelPermit(data) {
  return createRequest("/permit/cancel", "PUT", data);
}

function completePermit(data) {
  return createRequest(`/permit/completion/${data.id}`, "PUT", {});
}

function getPermitRenewals(data) {
  return createRequest(
    `/permit/renewal/fetch/all?${createParams(data)}`,
    "GET"
  );
}

function getPermitRenewal(data) {
  return createRequest(`/permit/renewal/${data.id}`, "GET");
}

function approveSafetyOfficerRenewal(data) {
  return createRequest("/permit/renewal/approve/safety-officer", "PUT", data);
}

function rejectSafetyOfficerRenewal(data) {
  return createRequest("/permit/renewal/reject/safety-officer", "PUT", data);
}

function approveIssuingAuthRenewal(data) {
  return createRequest("/permit/renewal/approve/issuring-sup", "PUT", data);
}

function rejectIssuingAuthRenewal(data) {
  return createRequest("/permit/renewal/reject/issuring-sup", "PUT", data);
}

function getPermitCompletions(data) {
  return createRequest(
    `/permit/completion/fetch/all?${createParams(data)}`,
    "GET"
  );
}

function approveHseCompletion(data) {
  return createRequest(
    `/permit/completion/approve/hse-officer/${data.id}`,
    "PUT",
    {}
  );
}

function rejectHseCompletion(data) {
  return createRequest(
    `/permit/completion/reject/hse-officer/${data.id}`,
    "PUT",
    {}
  );
}

function approveIssuingAuthCompletion(data) {
  return createRequest(
    `/permit/completion/approve/issuring-sup/${data.id}`,
    "PUT",
    {}
  );
}

function rejectIssuingAuthCompletion(data) {
  return createRequest(
    `/permit/completion/reject/issuring-sup/${data.id}`,
    "PUT",
    {}
  );
}

function getSuspendedPermits() {
  return createRequest(`/permit/suspend/all`, "GET");
}

function getContinuationPermits(data) {
  return createRequest(`/permit/continuation/all?${createParams(data)}`, "GET");
}

function initiateContinuation(data) {
  return createRequest(`/permit/continuation/${data.id}`, "PUT", {});
}

function approveHseContinuation(data) {
  return createRequest(
    `/permit/continuation/approve/hse-officer/${data.id}`,
    "PUT",
    {}
  );
}

function approveIssuingAuthContinuation(data) {
  return createRequest(
    `/permit/continuation/approve/issuring-sup/${data.id}`,
    "PUT",
    {}
  );
}

function sendBackToAuthority(data) {
  return createRequest(`/permit/send-back`, "POST", data);
}

function requestPermitClosure(data) {
  return createRequest(`/permit/closure/request/${data}`, "PUT", {});
}

function requestPermitRevalidation(data) {
  return createRequest(`/permit/revalidation/request/${data}`, "PUT");
}

function closurePerfSupervisor(data) {
  return createRequest(
    `/permit/closure/approve/performing-auth-supervisor`,
    "POST",
    data
  );
}
function closureSafetyOfficer(data) {
  return createRequest(`/permit/closure/approve/safety-officer`, "POST", data);
}
function closureIssuingSupervisor(data) {
  return createRequest(
    `/permit/closure/approve/issuing-auth-supervisor`,
    "POST",
    data
  );
}

function reactivatePermit(data) {
  return createRequest(`/permit/reactivate/${data.id}`, "PUT");
}

function approveRevalidationIssuingSupervisor(data) {
  return createRequest(
    "/permit/revalidation/approve/issuing-auth-supervisor",
    "POST",
    data
  );
}

function addOnsiteNote(data) {
  return createRequest("/permit/note", "POST", data);
}

function getProcessablePermits() {
  return createRequest(`/permit/user/processable`, "GET");
}

function attachPermitRole(data) {
  return createRequest(`/permit/profile/authority`, "POST", data);
}

export {
  createPermit,
  addOnsiteNote,
  createDraft,
  sendBackToAuthority,
  requestPermitClosure,
  requestPermitRevalidation,
  getPermits,
  getPermit,
  reactivatePermit,
  approveIssuingAuth,
  rejectIssuingAuth,
  approveHseAuth,
  rejectHseAuth,
  rejectAuthorizingAuth,
  approveAuthorizingAuth,
  approvePerfSupervisor,
  closurePerfSupervisor,
  approveRevalidationPerfSupervisor,
  closureSafetyOfficer,
  approveRevalidationSafetyOfficer,
  closureIssuingSupervisor,
  approveRevalidationIssuingSupervisor,
  approveSafetyOfficer,
  cancelPermit,
  approveIssuingSupervisor,
  renewPermit,
  AddOnsiteNote,
  suspendPermit,
  completePermit,
  getPermitRenewals,
  getPermitRenewal,
  approveSafetyOfficerRenewal,
  rejectSafetyOfficerRenewal,
  approveIssuingAuthRenewal,
  rejectIssuingAuthRenewal,
  getPermitCompletions,
  getSuspendedPermits,
  approveHseCompletion,
  rejectHseCompletion,
  rejectIssuingAuthCompletion,
  approveIssuingAuthCompletion,
  getContinuationPermits,
  initiateContinuation,
  approveHseContinuation,
  approveIssuingAuthContinuation,
  getProcessablePermits,
  attachPermitRole,
};
