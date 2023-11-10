import { Request, Response } from 'express';

// eslint-disable-next-line no-unused-vars
type MiddlewareFunction = (req: Request, res: Response) => Promise<void>;

export const catchErrors = (middleware: MiddlewareFunction) => async (req: Request, res: Response) => {
  try {
    await middleware(req, res);
  } catch (err) {
    res.status(404).json({ status: 'Not found' });
  }
};
export const catchSignupErrors = (middleware: MiddlewareFunction) => async (req: Request, res: Response) => {
  try {
    await middleware(req, res);
  } catch (err) {
    res.status(409).json({
      contentType: 'application/json',
      ResponseBody: { message: 'Email in use' },
    });
  }
};
export const catchLogErrors = (middleware: MiddlewareFunction) => async (req: Request, res: Response) => {
  try {
    await middleware(req, res);
  } catch (err) {
    res.status(401).json({
      ResponseBody: { message: "Email doesn't exist / Password is wrong" },
    });
  }
};

export const catchDownloadError = (middleware: MiddlewareFunction) => async (req: Request, res: Response) => {
  try {
    await middleware(req, res);
  } catch (err) {
    res.status(500).json({ ResponseBody: { message: 'Download error' } });
  }
};
