import express from 'express';
import QRCodeController from '../controllers/qrcodeController';

const qrRouter = express.Router();

qrRouter.get('/generate', QRCodeController.generateQRCode);

export default qrRouter;


