import express, { Request, Response } from 'express';
import shortid from 'shortid';
const viewRouter = express.Router();

viewRouter.get("/", (req, res)=> {
  res.status(200).render("index")
})

viewRouter.get("/login", (req, res)=> {
  res.status(200).render("login")
})

viewRouter.get("/shortenUrl", (req, res)=> {
  res.status(200).render("shortenUrl", { shortUrl: shortid})
})

export default  viewRouter

