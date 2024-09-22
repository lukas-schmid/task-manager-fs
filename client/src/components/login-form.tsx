"use client";

import { login } from "@/actions/auth";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { CircleAlert } from "lucide-react";

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <form className="flex flex-col gap-4" action={action}>
      <div className="flex flex-col gap-2">
        {state?.apiErrors?.messages &&
          state?.apiErrors?.messages.length > 0 &&
          state?.apiErrors?.messages.map((message, index) => {
            return (
              <div
                className="flex items-center gap-1 p-1.5 rounded-sm text-sm text-red-800 bg-red-300"
                key={index}
              >
                <CircleAlert size={15} />
                <span>{message}</span>
              </div>
            );
          })}
      </div>
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
