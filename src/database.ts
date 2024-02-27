import { config } from 'dotenv';
config();
import { mongoDbConnection } from './config';
import createServer from './app';
import mongoose from 'mongoose';
import qrcodeRoute from './routes/qrcodeRoute';

const PORT: number = 8000;
const HOSTNAME: string = '0.0.0.0';

mongoDbConnection();
const app = createServer();

app.use('/qrcode', qrcodeRoute);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http//:localhost:${PORT}`);
});

