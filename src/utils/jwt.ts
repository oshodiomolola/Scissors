import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

async function jwtToken(payload: string | Buffer | object) {
  const token = await jwt.sign({ id: payload }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRATION! });
  return token;
}

export { jwtToken };
