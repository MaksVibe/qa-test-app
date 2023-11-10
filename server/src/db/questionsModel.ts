import { NextFunction, Request, Response } from 'express';

import { Document, Schema, model, Model } from 'mongoose';
import Joi from 'joi';

export interface Question {
  question: string;
  questionId: string;
  answers: Record<string, any>;
  rightAnswer: string;
}

const questionSchema = new Schema<Question & Document>({
  question: {
    type: String,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
    unique: true,
  },
  answers: {
    type: Object,
    default: {},
  },
  rightAnswer: {
    type: String,
  },
});

const postAuthValidation = (req: Request, res: Response, next: NextFunction) => {
  const schemaValid = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .optional(),
    password: Joi.string().required(),
  });

  const validationResult = schemaValid.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      contentType: 'application/json',
      ResponseBody: validationResult.error.details,
    });
  }
  return next();
};

export const QuestionTechnical: Model<Question & Document> = model('questions-technicals', questionSchema);
export const QuestionTheory: Model<Question & Document> = model('questions-theories', questionSchema);

export const schemas = {
  postAuthValidation,
};
