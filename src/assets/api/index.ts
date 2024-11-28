import { route } from "preact-router";

export async function createRequest(
  endpoint,
  method,
  body?: Record<string, any>,
  content_type?: string
) {
  try {
    console.log(content_type);
    const config: any = {
      method,
      headers: {
        "Content-Type": `${
          content_type === "multipart/form-data" ? "" : "application/json"
        }`,
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    };

    console.log(config);

    if (body) config.body = JSON.stringify(body);

    const res = await fetch(
      `https://eptw.ankursolutions.com/api${endpoint}`,
      config
    );

    const response = await res.json();

    if (res.status == 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_profile");
      route("/login");
    } else {
      if (!res.ok) return [null, response];
      return [response, null];
    }
  } catch {
    return [null, { message: "Something went wrong, please try again" }];
  }
}
