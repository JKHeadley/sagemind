import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

function getAuth() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!key) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not set");

  const credentials = JSON.parse(key);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
}

function getDrive() {
  return google.drive({ version: "v3", auth: getAuth() });
}

/**
 * Create a subfolder inside the root estimates folder.
 * Folder name: "YYYY-MM-DD / Travel Estimate - [Patient Name]"
 */
export async function createPatientFolder(patientName: string): Promise<{
  folderId: string;
  folderUrl: string;
}> {
  const drive = getDrive();
  const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootFolderId) throw new Error("GOOGLE_DRIVE_FOLDER_ID not set");

  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const folderName = `${date} / Travel Estimate - ${patientName}`;

  const res = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [rootFolderId],
    },
    fields: "id, webViewLink",
    supportsAllDrives: true,
  });

  return {
    folderId: res.data.id!,
    folderUrl: res.data.webViewLink!,
  };
}

/**
 * Upload a file buffer to a Drive folder.
 */
export async function uploadFileToDrive(
  folderId: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer
): Promise<{ fileId: string; fileUrl: string }> {
  const drive = getDrive();
  const { Readable } = await import("stream");

  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: "id, webViewLink",
    supportsAllDrives: true,
  });

  return {
    fileId: res.data.id!,
    fileUrl: res.data.webViewLink!,
  };
}

/**
 * Upload a PDF buffer to a Drive folder.
 */
export async function uploadPdfToDrive(
  folderId: string,
  fileName: string,
  pdfBuffer: Buffer
): Promise<{ fileId: string; fileUrl: string }> {
  return uploadFileToDrive(folderId, fileName, "application/pdf", pdfBuffer);
}
