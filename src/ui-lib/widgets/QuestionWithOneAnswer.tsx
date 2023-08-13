/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState, useEffect } from 'react';
import AddAnswersOnPage from '@/ui-lib/widgets/AddAnswersOnPage';
import { QuestionTypeProps } from '@/constants/question-types';

const QuestionWithOneAnswer: FC<QuestionTypeProps> = ({ questionId }) => {
  const [answers, setAnswers] = useState<{
    id: number,
    text: string,
    isRight: boolean,
  }[]>([{ id: 0, text: '', isRight: false }]);
  const [isAnswerValid, setIsAnswerValid] = useState<{
    isValid: boolean,
    id: number,
  }[]>([{ isValid: true, id: 0 }]);

  useEffect(() => {
    if (answers.length === 0) {
      setAnswers([{ id: 0, text: '', isRight: false }]);
      setIsAnswerValid([{ isValid: true, id: 0 }]);
    }
  }, [answers]);

  return (
    <AddAnswersOnPage
      questionId={questionId}
      questionType='ONE'
      answers={answers}
      setAnswers={setAnswers}
      isAnswerValid={isAnswerValid}
      setIsAnswerValid={setIsAnswerValid}
      title='Варианты ответов'
      description='Введите варианты ответов и отметьте правильные варианты'
      placeholder='Введите вариант' />
  );
};
export default QuestionWithOneAnswer;
