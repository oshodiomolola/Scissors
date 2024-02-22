import dotenv from 'dotenv';

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// import { userRouter } from './routes/userRoute';
import userRouter from "./routes/userRoute"


dotenv.config();

function createServer() {
  const server = express();

  server.use(bodyParser.json());
  
  server.get("/", (req: Request, res: Response) => {
    res.send("Yaaaay!! get your short url with Scissors!!!");
  });
  
  server.use("/users", userRouter)
  return server
}

export default createServer



