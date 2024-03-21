"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qr_image_1 = __importDefault(require("qr-image"));
class QRCodeController {
    generateQRCode(req, res) {
        const { text } = req.query;
        if (!text || typeof text !== 'string') {
            res.status(400).json({ error: 'Text query parameter is missing or invalid' });
        }
        else {
            try {
                const qr_png = qr_image_1.default.image(text, { type: 'png' });
                res.type('png');
                res.setHeader('Content-Disposition', 'inline; filename="qrcode.png"');
                qr_png.pipe(res);
            }
            catch (error) {
                console.error('Error generating QR code:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
exports.default = new QRCodeController();
// import { Request, Response } from 'express';
// import qrImage from 'qr-image'
// class QRCodeController {
//   generateQRCode(req: Request, res: Response): void {
//     const { text } = req.query;
//     if (!text || typeof text !== 'string') {
//       res.status(400).json({ error: 'Text query parameter is missing or invalid' });
//     } else {
//       try {
//         const qr_png = qrImage.image(text, { type: 'png' });
//         res.type('png');
//         res.setHeader('Content-Disposition', 'inline; filename="qrcode.png"');
//         qr_png.pipe(res);
//       } catch (error) {
//         console.error('Error generating QR code:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     }
//   }
// }
// export default new QRCodeController();
//# sourceMappingURL=qrcodeController.js.map