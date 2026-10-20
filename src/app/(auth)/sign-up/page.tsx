import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a MediCare account for your hospital role.",
};

export default function SignUpPage() {
  return (
    <AuthShell mode="sign-up">
      <SignUpForm />
    </AuthShell>
  );
}
