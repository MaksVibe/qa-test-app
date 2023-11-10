import { NextFunction, Request, Response } from 'express';
import { getUserQuestions, checkQuestions } from '../services/questions';

export const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions = await getUserQuestions(req.params as { type: string });
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

export const checkQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await checkQuestions(req.params.type, req.body);
    console.log('result', result);
    res.status(200).json({ rightAnswers: result });
  } catch (error) {
    next(error);
  }
};
