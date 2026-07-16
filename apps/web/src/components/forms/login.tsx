import { authClient } from "@packages/auth/client";
import { zAuthSchemas } from "@packages/utilities";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import useZodForm from "../hooks/useZodForm";
import { Google } from "../icons";
import { Field, FieldError, FieldLabel } from "../ui/field";

export default function LoginForm() {
  const { isSubmitting, fieldErrors, handleSubmit } = useZodForm({
    schema: zAuthSchemas.signIn,
    onSubmit: async (data) => {
      await authClient.signIn.email({ ...data, callbackURL: "/u/home" });
    },
  });

  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && data?.session) router.push("/u/home");
  }, [isPending, data, router]);

  const handleOAuth = async (provider: "google" | "facebook" | "github") => {
    await authClient.signIn.social({
      provider: provider,
      callbackURL: "/login",
    });
  };

  return (
    <Card className="w-full max-w-md border-border">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>

        <CardDescription>Please login to continue</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FieldError>{fieldErrors.global || fieldErrors.auth}</FieldError>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input id="email" name="email" type="email" placeholder="Email" autoComplete="email" />
          <FieldError>{fieldErrors.email}</FieldError>

          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          <FieldError>{fieldErrors.password}</FieldError>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <Field className="w-fit" orientation="horizontal">
              <Checkbox id="rememberMe" name="rememberMe" />
              <FieldLabel htmlFor="rememberMe" className="text-sm text-muted-foreground">
                Remember me
              </FieldLabel>
            </Field>

            <Link href="/forgot-password" className="h-auto p-0 text-sm hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging In..." : "Login"}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-foreground hover:underline">
            Sign up
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or login with</span>
          </div>
        </div>

        <Button
          onClick={() => handleOAuth("google")}
          variant="outline"
          type="button"
          className="w-full text-base"
        >
          <Google className="size-3.5" />
          Google
        </Button>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="hover:text-foreground hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:text-foreground hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}
