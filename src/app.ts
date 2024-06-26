import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import qrcodeController from './controllers/qrcodeController';
import cookieParser = require('cookie-parser');

dotenv.config();

function createServer() {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieParser());

  server.get('/qrcode', qrcodeController.generateQRCode);

  return server;
}

export default createServer;