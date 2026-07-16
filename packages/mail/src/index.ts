import { appLogger, appEnv } from "@packages/utilities";
import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
  host: appEnv.SMTP_HOST,
  port: appEnv.SMTP_PORT,
  secure: appEnv.SMTP_SECURE, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: appEnv.SMTP_USER,
    pass: appEnv.SMTP_PASS,
  },
});

try {
  await mailTransporter.verify();
  appLogger.info("Nodemailer transporter is ready to send emails");
} catch (err) {
  appLogger.error(err, "Nodemailer transporter verification failed:");
}
