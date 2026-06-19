import { zAuthSchemas } from "@packages/utilities";
import useZodForm from "../hooks/useZodForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import Link from "next/link";
import { authClient } from "@packages/auth/client";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const router = useRouter()

    const { isSubmitting, fieldErrors, handleSubmit } = useZodForm({
        schema: zAuthSchemas.signUp, onSubmit: async (data) => {
            await authClient.signUp.email({ ...data, callbackURL: "/u/home" }, { onSuccess: () => router.push("/u/home") })
        }
    })

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
                <FieldError children={fieldErrors.global || fieldErrors.auth} />

                <form onSubmit={handleSubmit} className="space-y-4">

                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Name"
                        autoComplete="name"
                    />
                    <FieldError children={fieldErrors.name} />

                    <FieldLabel htmlFor="email"> Email </FieldLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                    />
                    <FieldError children={fieldErrors.email} />

                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <FieldError children={fieldErrors.password} />

                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <FieldError children={fieldErrors.confirmPassword} />

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