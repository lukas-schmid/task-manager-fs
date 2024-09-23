"use server";

import { SignupFormSchema, FormAuthState } from "@/lib/definitions";
import { ErrorCodes } from "@/types/errorCodes.enum";
import { AuthError, AuthSuccess } from "@/types/auth.interface";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { apiUrl } from "@/config";

export async function register(
  state: FormAuthState,
  formData: FormData,
): Promise<FormAuthState | undefined> {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password, email } = validatedFields.data;

  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });

    if (!response.ok) {
      const errorData: AuthError = await response.json();
      switch (errorData.code) {
        case ErrorCodes.userAlreadyExists:
        case ErrorCodes.validationError:
          return {
            apiErrors: {
              messages: errorData.details,
            },
          };
        default:
          return {
            apiErrors: {
              messages: ["An unknown error occured. Couldn't sign up"],
            },
          };
      }
    }

    const user: AuthSuccess = await response.json();

    const { id, token } = user;
    await createSession({ id, token });
  } catch (err) {
    console.error(err);
    return {
      apiErrors: {
        messages: ["An unknown error occured. Couldn't sign up"],
      },
    };
  }
  redirect("/boards");
}

export async function login(
  state: FormAuthState,
  formData: FormData,
): Promise<FormAuthState | undefined> {
  const formFields = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { password, email } = formFields;

  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData: AuthError = await response.json();
      switch (errorData.code) {
        case ErrorCodes.incorrectCredentials:
          return {
            apiErrors: {
              messages: errorData.details,
            },
          };
        default:
          return {
            apiErrors: {
              messages: ["An unknown error occured. Couldn't login"],
            },
          };
      }
    }

    const user: AuthSuccess = await response.json();
    const { id, token } = user;
    await createSession({ id, token });
  } catch (err) {
    console.error(err);
    return {
      apiErrors: {
        messages: ["An unknown error occured. Couldn't sign up"],
      },
    };
  }
  redirect("/boards");
}

export async function logout() {
  deleteSession();
  redirect("/");
}
