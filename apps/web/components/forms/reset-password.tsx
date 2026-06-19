"use client"

import { zAuthSchemas } from "@packages/utilities";
import useZodForm from "../hooks/useZodForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { authClient } from "@packages/auth/client";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
    const { isSubmitting, fieldErrors, handleSubmit } = useZodForm({
        schema: zAuthSchemas.resetPassword, onSubmit: async (data) => {
            const token = useSearchParams().get("token") ?? undefined
            await authClient.resetPassword({ ...data, token })
        }
    })

    return (
        <Card className="w-full max-w-md border-border">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-semibold">
                    Set New Password
                </CardTitle>

                <CardDescription>
                    Set a password to be used to login to your account
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <FieldError children={fieldErrors.global || fieldErrors.auth} />

                <form onSubmit={handleSubmit} className="space-y-4">

                    <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="New Password"
                    />
                    <FieldError children={fieldErrors.newPassword} />

                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <FieldError children={fieldErrors.confirmPassword} />

                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Resetting Password..." : "Reset Password"}
                    </Button>

                </form>

                <Link href="/login" className="flex items-center hover:underline"><ChevronLeft className="w-5 h-5" /> Back to login</Link>
            </CardContent>
        </Card>
    )
}