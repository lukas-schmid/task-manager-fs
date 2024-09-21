import Link from "next/link";
import { Button } from "./components/button";

export default function Home() {
  return (
    <div>
      <nav className="flex items-center justify-end h-16 px-4 gap-3 bg-muted">
        <Link href="/login">
          <Button className="h-8 bg-transparent">Login</Button>
        </Link>
        <Link href="/register">
          <Button className="h-8">Register</Button>
        </Link>
      </nav>
      <main className="p-2">Some blog articles with images</main>
    </div>
  );
}
