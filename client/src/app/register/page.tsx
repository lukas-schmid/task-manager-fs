import { Card } from "@/components/card";
import { RegisterForm } from "@/components/signup-form";

export default function Register() {
  return (
    <main className="h-screen flex justify-center items-center p-2">
      <Card className="max-w-80 w-full">
        <RegisterForm />
      </Card>
    </main>
  );
}
