import { route } from "preact-router";

export async function createRequest(
  endpoint,
  method,
  body?: Record<string, any>,
  content_type?: string
) {
  try {
    const config: any = {
      method,
      headers: {
        "Content-Type": `${
          content_type === "multipart/form-data" ? "" : "application/json"
        }`,
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    };

    if (body) config.body = JSON.stringify(body);

    const res = await fetch(
      // `http://9.141.17.85:3000/api${endpoint}`,
      // `http://localhost:3000/api${endpoint}`,
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
  } catch (error) {
    console.log(error)
    return [null, { message: "Something went wrong, please try again" }];
  }
}
