import { createRequest } from ".";

function getOverview() {
  return createRequest("/profile/overview?days=30", "GET");
}

function getAnalytics() {
  return createRequest("/profile/analytics", "GET");
}

export { getOverview, getAnalytics };
