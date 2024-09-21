"use client";

import { register } from "@/app/actions/auth";
import { Input } from "./input";
import { Button } from "./button";
import Link from "next/link";
import { useFormState } from "react-dom";

export function RegisterForm() {
  const [state, action] = useFormState(register, undefined);

  console.log(state);

  return (
    <form className="flex flex-col gap-4" action={action}>
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
