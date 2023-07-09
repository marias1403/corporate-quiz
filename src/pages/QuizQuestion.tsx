/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Div,
  Title,
  Headline,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useParams } from 'react-router';
import StyledButton from '../ui-lib/StyledButton';
import { useGetQuizQuery, useSetAnswerMutation } from '../api/apiv2';
import ProgressBar from '../ui-lib/ProgressBar';
import { useDispatch } from '../store/store.types';
import { setLoaderState } from '../store/allSlice/allSlice';
import { Answer } from '../types/types';
import Results from '../ui-lib/widgets/Results';

const Answers = styled.li<{ selectedAnswer: number, cardId: number }>`
  cursor: pointer;
  padding: 16px;
  list-style: none;
  max-width: 447px;
  width: 100%;
  min-height: min-content;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ selectedAnswer, cardId }) => (selectedAnswer === cardId ? '#3F8AE0' : '#DCE1E6')};
  background: ${({ selectedAnswer, cardId }) => (selectedAnswer === cardId ? 'rgba(63, 138, 224, 0.15)' : 'none')};

  &:hover {
    border: 1px solid ${({ selectedAnswer, cardId }) => (selectedAnswer === cardId ? '#3F8AE0' : 'rgba(63, 138, 224, 0.15)')};
    background: ${({ selectedAnswer, cardId }) => (selectedAnswer === cardId ? 'rgba(63, 138, 224, 0.2)' : 'rgba(63, 138, 224, 0.05)')};
  }
`;

const QuizQuestion: React.FC = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetQuizQuery(id);
  const [setAnswer, result] = useSetAnswerMutation();
  const [progressObject, setProgress] = useState<Record<number, string>>({});

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [questions, setQuestions] = useState(data ? data.questions : []);
  const [allAnswers, setAllAnswers] = useState<(Answer | undefined)[]>([]);
  const [rightAnswersAmount, setRightAnswersAmount] = useState(0);

  useEffect(() => {
    setQuestions(data ? data.questions : []);
  }, [data]);

  useEffect(() => {
    setRightAnswersAmount(
      allAnswers.filter((answ) => (answ !== undefined && answ.isAnswerRight === true)).length,
    );
  }, [allAnswers]);

  const setNextPage = async () => {
    const answ = questions[currentPage].answers.find(({ id }) => id === selectedAnswer);
    await setAnswer(selectedAnswer);
    setAllAnswers([...allAnswers, answ]);
    setCurrentPage(currentPage + 1);
    setSelectedAnswer(0);
    if (currentPage !== questions.length) {
      setProgress({ ...progressObject, [currentPage]: ' ' });
    }
  };

  const selectAnswer = (answerId: number) => {
    console.log(answerId);
    setSelectedAnswer(answerId);
  };

  /* if (isLoading) { dispatch(setLoaderState(true)); } */

  return (
    <Div style={{ padding: 0, width: '100%', maxWidth: '914px' }}>
      <Title
        weight='3'
        style={{ padding: '10px 0 40px', fontWeight: 500 }}>
        {currentPage === questions.length ? '' : `Квиз «${data?.name}»`}
      </Title>
      {currentPage === questions.length
        ? (
          <Results
            rightAnswers={rightAnswersAmount}
            questions={questions.length}
            quizName={data?.name} />
        ) : (
          <>
            <ProgressBar questionArr={questions} progressObject={progressObject} />
            <Headline weight='3' style={{ marginTop: '32px' }}>{`Вопрос ${currentPage + 1}/${data?.question_amount}`}</Headline>
            <Title style={{
              margin: '20px 0',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '24px',
              letterSpacing: '0.38px',
            }}>
              {questions[currentPage].text}
            </Title>
            <ul
              style={{
                listStyle: 'none',
                padding: '0',
                margin: '0',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                justifyItems: 'start',
                alignItems: 'start',
                justifyContent: 'start',
                alignContent: 'start',
              }}>
              {questions[currentPage].answers.map((el) => (
                <Answers
                  key={el.id}
                  selectedAnswer={selectedAnswer}
                  cardId={el.id}
                  onClick={() => selectAnswer(el.id)}>
                  {el.text}
                </Answers>
              ))}
            </ul>
            <StyledButton onClick={setNextPage} disabled={selectedAnswer === 0} style={{ width: '167px', margin: '32px auto 0' }}>Дальше</StyledButton>
          </>
        )}
    </Div>
  );
};

export default QuizQuestion;
