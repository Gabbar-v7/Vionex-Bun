import { zAuthSchemas } from "@packages/utilities";
import useZodForm from "../hooks/useZodForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import Link from "next/link";
import { authClient } from "@packages/auth/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpForm() {
    const router = useRouter()

    const { isSubmitting, fieldErrors, handleSubmit } = useZodForm({
        schema: zAuthSchemas.signUp, onSubmit: async (data) => {
            await authClient.signUp.email({ ...data, callbackURL: "/u/home" }, { onSuccess: () => router.push("/u/home") })
        }
    })

    const { data, isPending } = authClient.useSession()

    useEffect(() => { if (!isPending && data?.session) router.push("/u/home") }, [isPending, data, router])

    return (
        <Card className="w-full max-w-md border-border">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-semibold">
                    Create Your Account
                </CardTitle>
                <CardDescription >
                    Fill in the form below to create your account
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <FieldError>{fieldErrors.global || fieldErrors.auth}</FieldError>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Name"
                        autoComplete="name"
                    />
                    <FieldError>{fieldErrors.name}</FieldError>

                    <FieldLabel htmlFor="email"> Email </FieldLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                    />
                    <FieldError>{fieldErrors.email}</FieldError>

                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <FieldError>{fieldErrors.password}</FieldError>

                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <FieldError>{fieldErrors.confirmPassword}</FieldError>

                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Signing Up..." : "Sign up"}
                    </Button>

                </form>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-foreground hover:underline"
                    >
                        Login
                    </Link>
                </div>

                <p className="text-center text-xs leading-relaxed text-muted-foreground">
                    By continuing, you agree to our{" "}
                    <Link
                        href="/terms"
                        className="hover:text-foreground hover:underline"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/privacy"
                        className="hover:text-foreground hover:underline"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </CardContent>
        </Card>
    )
}