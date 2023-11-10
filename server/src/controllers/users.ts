import { Request, Response, NextFunction } from 'express';
import { signupUser, loginUser, logoutUser, currentUser, refreshMToken } from '../services/users';

// interface AuthenticatedRequest extends Request {
//   user: { token: string }; // Modify this based on your actual user object
// }

const handleResponse = (res: Response, status: number, body: any) => {
  res.status(status).json({
    contentType: 'application/json',
    ResponseBody: body,
  });
};

export const signupUserControl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await signupUser(req.body);
    handleResponse(res, 201, user);
  } catch (error) {
    next(error);
  }
};

export const signinUserControl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await loginUser(req.body);
    handleResponse(res, 201, user);
  } catch (error) {
    next(error);
  }
};

export const logoutUserControl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await logoutUser(req.body.user.token);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const currentUserControl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await currentUser(req.body.user.token);
    handleResponse(res, 200, user);
  } catch (error) {
    next(error);
  }
};

export const refreshTokenControl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await refreshMToken(req.body.user.token);
    handleResponse(res, 200, user);
  } catch (error) {
    next(error);
  }
};
