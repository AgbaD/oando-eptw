import { createRequest } from ".";

function getOverview() {
  return createRequest("/profile/dash/overview", "GET");
}

function getAnalytics() {
  return createRequest("/profile/dash/analytics", "GET");
}

export { getOverview, getAnalytics };
