import express, { Request, Response } from 'express';
import path from 'path';
import { mongoDbConnection } from './config';
import createServer from './app';
import userRouter from './routes/userRoute';
import qrcodeRoute from './routes/qrcodeRoute';
import analyticsRoute from './routes/analyticsRouter';
import viewRouter from './routes/viewsRoute';
import urlRouter from './routes/urlRoute';
import cors from 'cors';

const PORT: number = 8000;
const HOSTNAME: string = '0.0.0.0';

mongoDbConnection();
const app = createServer();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req: Request, res: Response) => {
  res.render('signup');
});

app.get('/login', (req, res) => {
  res.render('login');
});

const allowedOrigin = 'http://localhost:8000';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', userRouter);
app.use('/qrcode', qrcodeRoute);
app.use('/analytics', analyticsRoute);
app.use('/shorten', urlRouter);
app.use('/views', viewRouter);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
});

