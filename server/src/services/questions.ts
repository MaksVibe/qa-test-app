import { QuestionTechnical, QuestionTheory, QuestionType } from '../db/questionsModel';

function getRandomQuestions(questions: QuestionType[]): QuestionType[] {
  const numQuestionsArr: Set<number> = new Set();
  const questionsTwelve: QuestionType[] = [];

  while (numQuestionsArr.size < 12) {
    const random = Math.floor(Math.random() * questions.length);
    numQuestionsArr.add(random);
  }
  numQuestionsArr.forEach(el => questionsTwelve.push(questions[el]));

  return questionsTwelve;
}

function countCorrectAnswers(answers: any[], data: any[]): number {
  let result = 0;

  answers.forEach(answer => {
    const element = data.map(el => el._id.toString()).indexOf(answer.questionId);

    if (element !== -1 && data[element].rightAnswer === answer.userAnswer) {
      result += 1;
    }
  });

  return result;
}

export const getUserQuestions = async (testingType: { type: string }): Promise<QuestionType[]> => {
  const { type } = testingType;
  console.log('type :>> ', type);

  if (type === 'QA technical training') {
    const technicalQuestions = await QuestionTechnical.find({}, { _id: 1, question: 1, answers: 1 });
    return getRandomQuestions(technicalQuestions);
  }

  if (type === 'Testing theory') {
    const theoryQuestions = await QuestionTheory.find({}, { _id: 1, question: 1, answers: 1 });
    return getRandomQuestions(theoryQuestions);
  }

  return [];
};

export const checkQuestions = async (type: string, answers: any[]): Promise<number> => {
  console.log('(type === "theory")', type === 'theory');
  if (type === 'theory') {
    const questions = await QuestionTheory.find({}, { _id: 1, rightAnswer: 1 });
    return countCorrectAnswers(answers, questions);
  }
  console.log('(type === "technical")', type === 'technical');
  if (type === 'technical') {
    const questions = await QuestionTechnical.find({}, { _id: 1, rightAnswer: 1 });
    return countCorrectAnswers(answers, questions);
  }

  return 0;
};
