import { SignInRequest } from "@/api/sign-in";
import { http, HttpResponse } from "msw";

export const signInMock = http.post<never, SignInRequest>(
  "/authenticate",
  async ({ request }) => {
    const { email } = await request.json();

    if (email === "johndoe@example.com") {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Set-Cookie": "auth=sample-jwt",
        },
      });
    }

    return new HttpResponse(null, { status: 401 });
  },
);
