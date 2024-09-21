"use client";

import { login } from "@/app/actions/auth";
import { Input } from "./input";
import { Button } from "./button";
import Link from "next/link";
import { useFormState } from "react-dom";

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <form className="flex flex-col gap-4" action={action}>
      {state?.apiErrors?.messages &&
        state?.apiErrors?.messages.length > 0 &&
        state?.apiErrors?.messages.map((message, index) => {
          return (
            <div
              className="px-1 rounded-sm text-sm text-red-800 bg-red-300"
              key={index}
            >
              {message}
            </div>
          );
        })}
      <Input
        id="email"
        type="email"
        name="email"
        label="Email"
        placeholder="Email"
      />
      <Input
        id="password"
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
      />
      <Button type="submit">Sign in</Button>
      <Link className="flex justify-center text-sm" href="/register">
        Sign up for an account
      </Link>
    </form>
  );
}
