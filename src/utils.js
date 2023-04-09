import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashPassword = async(pass) => {
  return bcrypt.hash(pass, 10);
}

export const comparePasswords = async(password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
}

export const generateToken = (user) => {
  const token = jwt.sign({user}, 'secretKeyJWT', {expiresIn: '1m'});
  return token;
}