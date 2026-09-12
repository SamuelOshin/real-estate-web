import { Card } from "@/components/ui";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <Card padding="lg" elevation="resting" className="shadow-sm border-border bg-surface-card rounded-2xl">
      <div className="mb-6 text-center">
        <h1 className="font-heading text-headline-md font-bold text-text-primary tracking-tight">
          Sign in to your account
        </h1>
        <p className="mt-1.5 font-body text-body-sm text-text-muted">
          Welcome back! Please enter your details.
        </p>
      </div>

      <LoginForm />
    </Card>
  );
}
