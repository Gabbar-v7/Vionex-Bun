import { appLogger, Environment } from "@packages/utilities"
import { createTransport } from "nodemailer"

export const mailTransporter = createTransport({
    host: Environment.SMTP_HOST,
    port: Environment.SMTP_PORT,
    secure: Environment.SMTP_SECURE, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: Environment.SMTP_USER,
        pass: Environment.SMTP_PASS,
    },
});

try {
    await mailTransporter.verify();
    appLogger.info("Nodemailer transporter is ready to send emails");
} catch (err) {
    appLogger.error(err, "Nodemailer transporter verification failed:");
}