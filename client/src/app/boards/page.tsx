"use client";
import { useUser } from "../context/UserProvider";

export default function Boards() {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <main>Board Page</main>
    </div>
  );
}
