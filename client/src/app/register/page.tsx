import { Card } from "@/components/common/Card";
import { RegisterForm } from "@/components/form/SignupForm";

export default function Register() {
  return (
    <main className="h-screen flex justify-center items-center p-2">
      <Card className="max-w-80 w-full">
        <RegisterForm />
      </Card>
    </main>
  );
}
