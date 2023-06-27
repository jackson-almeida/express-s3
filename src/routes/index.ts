import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import UploadImageService from '../services/UploadImageService';
import DeleteImageService from '../services/DeleteImageService';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/', upload.single('image'), async (request: any, response: any) => {
  const { file } = request;

  const uploadImageService = new UploadImageService();

  await uploadImageService.execute(file);

  return response.send();
});

routes.delete('/:filename', async (request: any, response: any) => {
  const { filename } = request.params;

  const deleteImageService = new DeleteImageService();

  await deleteImageService.execute(filename);

  return response.send();
});

export default routes;