/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import styled from 'styled-components';
import checkboxIcon from '@/assets/images/icons/checkbox_checked.svg';

const StyledMultipleChoiceAnswer = styled.li`
  padding: 16px 28px;
  list-style: none;
  width: 100%;
  min-height: min-content;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  text-align: center;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #DCE1E6;
  position: relative;
`;

const Label = styled.label`
  font-size: 15px;
  line-height: 20px;
  font-weight: 400;
  color: #000000;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;

const HiddenCheckboxInput = styled.input`
  opacity: 0;
  cursor: pointer;
  height: 16px;
  width: 16px;
`;

const CheckboxSpan = styled.span<{ isChecked: boolean }>`
  position: absolute;
  top: 50%;
  left: 28px;
  transform: translate(0, -50%);
  height: 16px;
  width: 16px;
  border-radius: 3px;
  cursor: pointer;
  box-sizing: border-box;
  border: ${({ isChecked }) => (isChecked ? 'none' : '1px solid #DCE1E6')};
  background-color: ${({ isChecked }) => (isChecked ? '#3F8AE0' : 'transparent')};
  background-image: ${({ isChecked }) => (isChecked ? `url(${checkboxIcon})` : 'none')};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 10px 7px;

  &:hover {
    background-color: #F0F2F5;
  }
`;

interface Question {
  id: number;
  text: string;
}

interface MultipleChoiceAnswerProps {
  question: Question;
  selectedAnswers: string[];
  onCheckboxChange: (questionId: number, option: string) => void;
}

const MultipleChoiceAnswer: React.FC<MultipleChoiceAnswerProps> = (
  {
    question,
    selectedAnswers,
    onCheckboxChange,
  },
) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    onCheckboxChange(question.id, option);
  };

  return (
    <StyledMultipleChoiceAnswer>
      <Label htmlFor={question.id.toString()}>
        <HiddenCheckboxInput
          id={question.id.toString()}
          type='checkbox'
          value={question.text}
          checked={selectedAnswers.includes(question.text)}
          onChange={handleCheckboxChange} />
        <CheckboxSpan isChecked={selectedAnswers.includes(question.text)} />
        {question.text}
      </Label>
    </StyledMultipleChoiceAnswer>
  );
};

export default MultipleChoiceAnswer;
