import S3Storage from "../utils/S3Storage";

class UploadImageService {
  async execute(file: Express.Multer.File): Promise<void> {
    const s3 = new S3Storage();

    await s3.saveFile(file.filename);
  }
 }

export default UploadImageService;