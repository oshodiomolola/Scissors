import express, { Request, Response } from 'express';
const viewRouter = express.Router();

viewRouter.get("/", (req, res)=> {
  res.status(200).render("index")
})

viewRouter.get("/login", (req, res)=> {
  res.status(200).render("login")
})

viewRouter.get("/shortenUrl", (req, res)=> {
  res.status(200).render("shortenUrl")
})

export default  viewRouter

