"use client";

import { authClient } from "@packages/auth/client";
import { z, zAuthFields, zAuthSchemas } from "@packages/utilities";
import { AlertTriangle, KeyRound, Loader2, Trash2, Upload } from "lucide-react";

import useZodForm from "../hooks/useZodForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

function ProfileCard({ user }: { user: typeof authClient.$Infer.Session.user }) {
  const nameForm = useZodForm({
    schema: z.object({ name: zAuthFields.name }),
    onSubmit: async (data) => {
      await authClient.updateUser(data);
    },
  });

  const emailForm = useZodForm({
    schema: z.object({ newEmail: zAuthFields.email }),
    onSubmit: async (data) => {
      await authClient.changeEmail(data);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <div className="group relative size-32 shrink-0">
          <Avatar className="h-full w-full">
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback className="text-6xl font-bold">{"> ."}</AvatarFallback>
          </Avatar>

          <Button
            type="button"
            size="icon"
            className="absolute right-0 bottom-0 rounded-full opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
            onClick={() => console.log("Success")}
          >
            <Upload className="h-8 w-8" />
          </Button>
        </div>

        <div className="w-full space-y-4">
          <form onSubmit={nameForm.handleSubmit} className="space-y-1.5">
            <FieldError>{nameForm.fieldErrors.global || nameForm.fieldErrors.auth}</FieldError>

            <div className="flex items-center gap-2">
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <FieldError>{nameForm.fieldErrors.name}</FieldError>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input id="name" name="name" placeholder={user.name} autoComplete="name" />
              <Button type="submit" disabled={nameForm.isSubmitting} className="sm:w-auto">
                {nameForm.isSubmitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>

          <form onSubmit={emailForm.handleSubmit} className="space-y-1.5">
            <FieldError>{emailForm.fieldErrors.global || emailForm.fieldErrors.auth}</FieldError>

            <div className="flex items-center gap-2">
              <FieldLabel htmlFor="newEmail">Email</FieldLabel>
              <Badge variant={user.emailVerified ? "outline" : "destructive"}>
                {user.emailVerified ? "Verified" : "Not Verified"}
              </Badge>
              <FieldError>{emailForm.fieldErrors.newEmail}</FieldError>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input id="newEmail" name="newEmail" placeholder={user.email} autoComplete="email" />
              <Button type="submit" disabled={emailForm.isSubmitting} className="sm:w-auto">
                {emailForm.isSubmitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

function PasswordCard() {
  const { isSubmitting, handleSubmit, fieldErrors } = useZodForm({
    schema: zAuthSchemas.changePassword,
    onSubmit: async (data) => {
      await authClient.changePassword(data);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>

      <CardContent>
        <FieldError>{fieldErrors.global || fieldErrors.auth}</FieldError>
        <form onSubmit={handleSubmit} className="space-y-1.5">
          <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
          <Input id="currentPassword" name="currentPassword" />
          <FieldError>{fieldErrors.currentPassword}</FieldError>

          <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
          <Input id="newPassword" name="newPassword" />
          <FieldError>{fieldErrors.newPassword}</FieldError>

          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input id="confirmPassword" name="confirmPassword" />
          <FieldError>{fieldErrors.confirmPassword}</FieldError>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating Password..." : "Update Password"}
          </Button>
        </form>

        <Separator className="my-3" />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Forgot Password?</p>
            <p className="text-sm text-muted-foreground">Send password reset link</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-4 shrink-0"
            onClick={() => {}}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <KeyRound className="mr-2 h-4 w-4" />
            )}
            Send link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DangerZoneCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
      </CardHeader>

      <CardContent>
        <AlertDialog open={false} onOpenChange={() => {}}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="ml-4 shrink-0">
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Delete
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Delete your account?
              </AlertDialogTitle>

              <AlertDialogDescription className="space-y-3">
                <span className="block">
                  This action is <strong className="text-foreground">permanent</strong> and cannot
                  be undone. All your data, subscriptions, and history will be erased immediately.
                </span>
                <span className="block">
                  Type{" "}
                  <Badge variant="outline" className="font-mono text-xs">
                    {" "}
                    CONFIRM
                  </Badge>{" "}
                  below to confirm.
                </span>
                <Input id="confirmDelete" name="confirmDelete" autoComplete="off" autoFocus />
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {}}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  console.log("Success");
                }}
                className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
              >
                Permanently Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}

export default function AccountSettingsForm() {
  const { isPending, data } = authClient.useSession();

  // TODO: Improve fallback
  if (isPending || !data?.user) return <Loader2 />;

  return (
    <div className="w-full max-w-6xl items-center space-y-4">
      <ProfileCard user={data.user} />
      <PasswordCard />
      <DangerZoneCard />
    </div>
  );
}
