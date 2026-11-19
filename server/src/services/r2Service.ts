import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ENV } from '../config/env';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

const isR2Configured = Boolean(
  ENV.CLOUDFLARE_R2_ACCOUNT_ID &&
    ENV.CLOUDFLARE_R2_ACCESS_KEY_ID &&
    ENV.CLOUDFLARE_R2_SECRET_ACCESS_KEY &&
    ENV.CLOUDFLARE_R2_BUCKET_NAME
);

let s3Client: S3Client | null = null;

if (isR2Configured) {
  s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${ENV.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: ENV.CLOUDFLARE_R2_ACCESS_KEY_ID,
      secretAccessKey: ENV.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
  });
}

export const uploadFileToCloudflareR2 = async (file: Express.Multer.File): Promise<string> => {
  const ext = path.extname(file.originalname).toLowerCase();
  const fileHash = crypto.randomBytes(16).toString('hex');
  const filename = `uploads/${Date.now()}-${fileHash}${ext}`;

  if (isR2Configured && s3Client) {
    console.log(`[Cloudflare R2] Uploading ${filename} to bucket: ${ENV.CLOUDFLARE_R2_BUCKET_NAME}`);
    const command = new PutObjectCommand({
      Bucket: ENV.CLOUDFLARE_R2_BUCKET_NAME,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3Client.send(command);

    const publicDomain = ENV.CLOUDFLARE_R2_PUBLIC_URL.replace(/\/$/, '');
    return `${publicDomain}/${filename}`;
  } else {
    // Fallback mode for local development without R2 credentials
    console.log('[Cloudflare R2] R2 credentials not configured. Saving file locally...');
    const uploadDir = path.resolve(__dirname, '../../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const localFilename = `${Date.now()}-${fileHash}${ext}`;
    const localPath = path.join(uploadDir, localFilename);
    fs.writeFileSync(localPath, file.buffer);

    return `/uploads/${localFilename}`;
  }
};
