import { Storage } from 'aws-amplify';

// Upload files to S3 Bucket
export async function s3Upload(file) {
  // Generates a unique file name using the current timestamp.
  // *Note: If the app is heavily used, this is not the best way to create a unique filename, though this should be fine for now.
  const filename = `${Date.now()}-${file.name}`;

  // Upload file to the user's folder in S3
  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}
