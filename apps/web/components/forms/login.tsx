import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { FieldError, FieldLabel } from "../ui/field";
import { Facebook, GitHub, Google } from "../icons";
import useZodForm from "../hooks/useZodForm";
import { zAuthSchemas } from "@packages/utilities";

const providers = [
    {
        name: "Google",
        icon: "/icons/google.svg",
    },
    {
        name: "Facebook",
        icon: "/icons/facebook.svg",
    },
    {
        name: "GitHub",
        icon: "/icons/github.svg",
    },
    // Add more providers here
];

export default function LoginForm() {
    const { isSubmitting, fieldErrors, handleSubmit } = useZodForm({ schema: zAuthSchemas.signIn, onSubmit: async () => { } });

    return (
        <Card className="w-full max-w-md border-border">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-semibold">
                    Welcome Back
                </CardTitle>

                <CardDescription>
                    Please login to continue
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <FieldError children={fieldErrors.global || fieldErrors.auth} />

                <form onSubmit={handleSubmit} className="space-y-4">

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                    />
                    <FieldError children={fieldErrors.email} />

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                    />
                    <FieldError children={fieldErrors.password} />

                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <FieldLabel className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <span className="text-sm text-muted-foreground">
                                Remember me
                            </span>
                        </FieldLabel>

                        <Button
                            variant="link"
                            type="button"
                            className="h-auto p-0 text-sm"
                        >
                            Forgot password?
                        </Button>
                    </div>

                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging In..." : "Login"}
                    </Button>

                </form>

                <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-foreground hover:underline"
                    >
                        Sign up
                    </Link>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                    </div>

                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            Or login with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                    >
                        <Google className="h-4 w-4" />
                        Google
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                    >
                        <Facebook className="h-4 w-4" />
                        Facebook
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        className="w-full col-span-2 sm:col-span-1"
                    >
                        <GitHub className="h-4 w-4" />
                        GitHub
                    </Button>
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
    );
}