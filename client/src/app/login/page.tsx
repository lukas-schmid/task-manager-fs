import { Card } from "@/components/card";
import { LoginForm } from "@/components/login-form";

export default function Login() {
  return (
    <main className="h-screen flex justify-center items-center p-2">
      <Card className="max-w-80 w-full">
        <LoginForm />
      </Card>
    </main>
  );
}
