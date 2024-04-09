import express, { Request, Response } from 'express';
import shortid from 'shortid';
import { isLoggedIn } from '../controllers/authController';
import { UrlModel } from '../models/shortenUrl';
import AppError from '../utils/errorHandler';
const viewRouter = express.Router();

viewRouter.get('/', (req, res) => {
  res.status(200).render('index');
});

viewRouter.get('/login', (req, res) => {
  res.status(200).render('login');
});
viewRouter.get('/myLinks', (req, res, next) => {
  try {
    res.status(200).render('myLinks');
  } catch (error) {}
});

viewRouter.get('/shortenUrl', (req, res) => {
  res.status(200).render('shortenUrl', { shortUrl: shortid });
});

export default viewRouter;