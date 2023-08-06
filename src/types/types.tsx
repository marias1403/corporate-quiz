/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
export type TUser = {
  firstName: string;
  lastName: string;
  role: string;
  courses: { [key: string]: any };
  progress: string;
  access: string;
  avatar: string;
  achievements: { [key: string]: any };
  position: string;
  ratingPlace: number;
  appointedCourses: { [key: string]: any };

};

export type TUserLoginRequest = {
  email: string;
  password: string;
  role: string;
};

type Tag = {
  id: number;
  name: string;
  color: string;
};

export type Answer = {
  id: number;
  text: string;
  image: string;
  isAnswerRight: boolean;
};

export type Question = {
  id: number;
  image: string;
  text: string;
  answers: Answer[];
  is_answered: boolean;
};

export type SingleChoiceQuestionProps = {
  currentPage: number;
  questions: Question[];
  selectedAnswer: number;
  selectAnswer: (answerId: number) => void;
};

export type Volume = {
  name: string;
  description: string;
};

export type TQuize = {
  directory: string;
  id: number,
  image: string,
  name: string;
  description: string;
  duration: number;
  level: string;
  question_amount: number;
  tags: Tag[];
  questions: Question[];
  volumes: Volume[];
  isPassed: any;
  appointed: any;
};

export type QuizCardProps = {
  setIsConfirmationPopupOpen?: any,
  id: number,
  image: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  question_amount: number;
  tags: any;
  isPassed: any;
};

export type TAnswerRequest = {
  id: number | string;
  quizId: number | string;
};

export type Statistic = {
  explanation: string;
  isRight: boolean;
  question: string;
  right_answer: string;
  user_answer: string;
};

export type Item = {
  id: number;
  text: string;
};

export type BoardProps = {
  title: string;
  board: Item[];
  onItemMove: (itemId: number) => void;
};

export type DnDCardProps = {
  id: number;
  text: string;
  backgroundColor: string;
  borderColor: string;
};

export type AdminQuizz = {
  id: number;
  image: string;
  description: string;
  directory: string;
  name: string;
  duration: number;
  level: string;
  question_amount: number;
  threshold: number;
  tags: {
    id: number;
    name: string;
    color: string;
  }[];
  questions: {
    id: number;
    question_type: string;
    text: string;
    image: string;
    answers: {
      id: number;
      text: string,
      image: string,
      answer_list: {
        id: number;
        text: string;
      }[]
    }[]
  }[];
  volumes: {
    id: number;
    name: string;
    description: string;
  }[];
};
