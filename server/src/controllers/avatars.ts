import { Request, Response, NextFunction } from 'express';

export const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.name;
    const avatarPath = `public/avatar/${name}`;

    const avatarUrl = `${req.protocol}://${req.get('host')}/${avatarPath}`;

    res.json({ avatar: avatarUrl, status: 'success' });
  } catch (error) {
    next(error);
  }
};
