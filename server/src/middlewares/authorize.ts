import { Request, Response, NextFunction } from 'express';
import { Users, User } from '../db/usersModel';
import jwt from 'jsonwebtoken';
import { Unauthorized } from 'http-errors';
import { config } from 'dotenv';

config();

const { JWT_SECRET } = process.env;
const secret: string = JWT_SECRET ?? 'defaultSecret';

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        contentType: 'application/json',
        ResponseBody: { message: 'Not authorized' },
      });
    }
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }

    jwt.verify(token, secret);

    const user = await Users.findOne({ token });

    if (!user) {
      throw new Unauthorized('Not authorized');
    }

    req.body = user as User;
    next();
  } catch (error: any) {
    if (!error.status) {
      error.status = 401;
      error.message = 'Not authorized!!!';
    }
    next(error);
  }
};

export default authorize;
