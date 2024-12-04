import { createRequest } from ".";

function createNewRole(data) {
  return createRequest("/role", "POST", data);
}

function getRoles() {
  return createRequest("/role", "GET");
}

// function getRole(id) {
//   return createRequest(`/role/${id}`, "GET");
// }
async function getRole(id) {
  const response = await createRequest(`/role/${id}`, "GET");
  console.log("Response from getRole on user.ts:", response[0]);
  return response;
}

function editRole(data) {
  return createRequest("/role", "PUT", data);
}

// All endpoints for Locations, Sites, and Work Areas
function createNewLocation(data) {
  return createRequest("/location", "POST", data);
}

function createNewWorkArea(data) {
  return createRequest("/location/work-area", "POST", data);
}

function editLocation(data) {
  return createRequest("/location", "PUT", data);
}

function getSites() {
  return createRequest("/location/site", "GET");
}

function getLocationsArea(id: number) {
  return createRequest(`/location/${id}`, "GET");
}

// All endpoints for Companies & External Users

function getAllCompanies() {
  return createRequest("/profile/company", "GET");
}

function getCompanyById(data) {
  return createRequest(`/profile/company/${data}`, "GET");
}

function editCompany(data, id) {
  return createRequest(`/profile/company/${id}`, "PUT", data);
}
function blockCompany(data) {
  return createRequest(`/profile/company/block/${data.id}`, "PUT", data);
}

function createInternalUser(data) {
  return createRequest("/profile/internal", "POST", data);
}

function createNewCompany(data) {
  return createRequest("/profile/company", "POST", data);
}

function createExternalUser(data) {
  return createRequest("/profile/external", "POST", data);
}

function editExternalUser(data) {
  return createRequest("/profile/external", "PUT", data);
}

function getExternalUsers() {
  return createRequest("/profile?type=external", "GET");
}

function getAllExternalUsers() {
  return createRequest("/auth/profile/external", "GET");
}
function getAllInternalUsers() {
  return createRequest("/auth/profile/internal", "GET");
}

// All endpoints for audits

function getAudits() {
  return createRequest("/audit", "GET");
}

// All endpoints for create, get, delete permit

function getAllPermits() {
  return createRequest("/permit", "GET");
}

function uploadFile(data) {
  return createRequest("/file/upload", "POST", data);
}

// All endpoints for create, get, delete and edit drafts

function getAllDrafts() {
  return createRequest("/permit/draft", "GET");
}

export {
  createNewRole,
  getRoles,
  getRole,
  editRole,
  createNewLocation,
  createNewWorkArea,
  editLocation,
  editExternalUser,
  getSites,
  getLocationsArea,
  createExternalUser,
  createInternalUser,
  getExternalUsers,
  getAllInternalUsers,
  getAllExternalUsers,
  getAudits,
  getAllCompanies,
  getCompanyById,
  editCompany,
  blockCompany,
  createNewCompany,
  getAllPermits,
  uploadFile,
  getAllDrafts,
};
