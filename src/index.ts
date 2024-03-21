import express, { Request, Response } from 'express';
import path from "path";
// import { config } from 'dotenv';
// config();
import { mongoDbConnection } from './config';
import createServer from './app';
// import mongoose from 'mongoose';
import userRouter from './routes/userRoute';
import qrcodeRoute from './routes/qrcodeRoute';
import analyticsRoute from './routes/analyticsRouter';
import viewRouter from './routes/viewsRoute';


const PORT: number = 8000;
const HOSTNAME: string = '0.0.0.0';

mongoDbConnection();
const app = createServer();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get("/", (req: Request, res: Response) => {
  res.render("signup");
});

app.get('/login', (req, res) => {
  res.render('login');
});

// app.get('/shortenUrl', (req, res) => {
//   res.render('shortenUrl');
// });


app.use(express.static(path.join(__dirname, "public")))
app.use('/users', userRouter);
app.use('/qrcode', qrcodeRoute);
app.use('/analytics', analyticsRoute);
app.use("/views", viewRouter);




app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

