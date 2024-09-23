"use client";

import { register } from "@/actions/auth";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { CircleAlert } from "lucide-react";

export function RegisterForm() {
  const [state, action] = useFormState(register, undefined);

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
        error={state?.validationErrors?.email}
      />
      <Input
        id="username"
        type="text"
        name="username"
        label="Username"
        placeholder="Username"
        error={state?.validationErrors?.username}
      />
      <Input
        id="password"
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
        error={
          state?.validationErrors?.password && (
            <div>
              <p className="text-red-600">Password must:</p>
              <ul>
                {state.validationErrors?.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )
        }
      />
      <Button type="submit">Register</Button>
      <Link className="flex justify-center text-sm" href="/login">
        Sign in
      </Link>
    </form>
  );
}
