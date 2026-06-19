import { S3Client } from "bun";
import { appEnv } from "@packages/utilities";

export const s3Client = new S3Client({
    accessKeyId: appEnv.S3_ACCESS_KEY_ID,
    secretAccessKey: appEnv.S3_SECRET_ACCESS_KEY,
    region: appEnv.S3_REGION,
    endpoint: appEnv.S3_ENDPOINT,
    bucket: appEnv.S3_BUCKET,
});
