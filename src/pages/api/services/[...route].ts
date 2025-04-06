import { getAuth } from "@clerk/nextjs/server";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Fetches the user's session token, then forwards the request
 * to the backend.
 *
 * Clerk Auth requires that you send the session token in an Authorization
 * header, but for whatever reason it does not include that header by
 * default. This function grabs the token from Clerk, puts it into an
 * Authorization header, then sends the request to the backend.
 *
 * Clerk Docs on fetching the user info server side:
 * https://clerk.com/docs/references/nextjs/read-session-data#pages-router
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { route } = req.query;
  const { getToken } = getAuth(req);
  const token = await getToken();

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const backendUrl = `${process.env.BACKEND_BASE_URL}/${Array.isArray(route) ? route.join("/") : route}`;

    console.log("backendUrl", backendUrl);

    const response = await axios({
      method: req.method,
      url: backendUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...req.headers,
        // Don't forward the host header from the client, or it causes SSL issues due to
        // the server only being signed for the api subdomain
        host: new URL(process.env.BACKEND_BASE_URL as string).hostname,
      },
      data: req.method !== "GET" ? req.body : undefined,
    });

    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error forwarding request:", error);

      const status = error.response?.status || 500;
      const data = error.response?.data || { error: "An error occurred" };

      res.status(status).json(data);
    } else {
      console.error("Error forwarding request:", error);

      res.status(500).json({ error: "An error occurred" });
    }
  }
}
