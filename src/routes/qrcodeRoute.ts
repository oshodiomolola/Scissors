// src/routes/qrcodeRoute.ts

import express from 'express';
import QRCodeController from '../controllers/qrcodeController';

const router = express.Router();

router.get('/generate', QRCodeController.generateQRCode);

export default router;

