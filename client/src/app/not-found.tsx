import { Card } from "@/components/card";
import Link from "next/link";

const messages = [
  "You’re right on target... just in the wrong neighborhood! Let’s find you a better page!",
  "Congrats! You’re absolutely correct... about the website. But this page? It took a wrong turn!",
  "You’ve got the right website, but this page must’ve taken a coffee break. Let’s get you back on track!",
  "Right website, wrong page! It’s like showing up at the party but in the wrong costume!",
];

const emojis = ["🤷", "🙈", "🚫", "🦄", "😜"];

export default function NotFound() {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  return (
    <main className="flex justify-center items-center h-full p-3">
      <Card className="flex flex-col justify-center items-center gap-6 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center text-primary">
          {randomEmoji} Ooops! Page Not Found {randomEmoji}
        </h2>
        <p className="text-lg text-gray-700 mb-4 text-center max-w-80">
          {randomMessage}
        </p>
        <Link href="/" className="text-center text-blue-500 hover:underline">
          Return Home
        </Link>
      </Card>
    </main>
  );
}
