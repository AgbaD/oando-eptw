import { createRequest } from ".";

function getOverview() {
  return createRequest("/profile/overview", "GET");
}

function getAnalytics() {
  return createRequest("/profile/analytics", "GET");
}

export { getOverview, getAnalytics };
