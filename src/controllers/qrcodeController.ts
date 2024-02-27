import { Request, Response } from 'express';
import qrImage from 'qr-image'

class QRCodeController {
  generateQRCode(req: Request, res: Response): void {
    const { text } = req.query;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text query parameter is missing or invalid' });
      // No return statement here
    } else {
      try {
        // Generate QR code image
        const qr_png = qrImage.image(text, { type: 'png' });

        // Set content type and disposition headers
        res.type('png');
        res.setHeader('Content-Disposition', 'inline; filename="qrcode.png"');

        // Pipe the image to the response stream
        qr_png.pipe(res);
      } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

export default new QRCodeController();

