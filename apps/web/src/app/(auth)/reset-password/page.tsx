import { Suspense } from "react";

import ResetPasswordForm from "@/components/forms/reset-password";

export default function ResetPasswordPage() {
  return (
    <main className="flex h-dvh w-full items-center justify-center p-4">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
