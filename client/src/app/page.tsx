import Link from "next/link";
import { Button } from "./components/button";

export default function Home() {
  return (
    <div>
      <nav className="flex items-center justify-end h-16 px-4 gap-3 bg-muted">
        <Button className="h-8 bg-transparent">
          <Link href="/login">Login</Link>
        </Button>
        <Button className="h-8">
          <Link href="/register">Register</Link>
        </Button>
      </nav>
      <main>Some blog articles with images</main>
    </div>
  );
}
