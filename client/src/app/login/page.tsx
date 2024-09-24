import { Card } from "@/components/common/Card";
import { LoginForm } from "@/components/form/LoginForm";

export default function Login() {
  return (
    <main className="h-screen flex justify-center items-center p-2">
      <Card className="max-w-80 w-full">
        <LoginForm />
      </Card>
    </main>
  );
}
