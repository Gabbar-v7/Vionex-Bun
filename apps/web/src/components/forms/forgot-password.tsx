"use client";

import { authClient } from "@packages/auth/client";
import { zAuthSchemas } from "@packages/utilities";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import useZodForm from "../hooks/useZodForm";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FieldError } from "../ui/field";
import { Input } from "../ui/input";

export default function ForgotPasswordForm() {
  const { isSubmitting, fieldErrors, handleSubmit } = useZodForm({
    schema: zAuthSchemas.forgotPassword,
    onSubmit: async (data) => {
      await authClient.requestPasswordReset({ ...data, redirectTo: "/reset-password" });
    },
  });

  return (
    <Card className="w-full max-w-md border-border">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-semibold">Forgot Password?</CardTitle>

        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your password
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FieldError>{fieldErrors.global || fieldErrors.auth}</FieldError>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input id="email" name="email" type="email" placeholder="Email" autoComplete="email" />
          <FieldError>{fieldErrors.email}</FieldError>

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
          </Button>
        </form>

        <Link href="/login" className="flex items-center hover:underline">
          <ChevronLeft className="h-5 w-5" /> Back to login
        </Link>
      </CardContent>
    </Card>
  );
}
