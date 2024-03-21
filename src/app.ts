import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import qrcodeController from './controllers/qrcodeController';

dotenv.config();

function createServer() {
  const server = express();

// server.get('/', (req: Request, res: Response) => {
//     res.send('Yaaaay!! get your short url with Scissors!!!');
//   });

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.get('/qrcode', qrcodeController.generateQRCode);

  return server;
}

export default createServer;




