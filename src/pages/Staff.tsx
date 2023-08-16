/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import StaffFilter from '@/ui-lib/widgets/StaffFilters';
import StaffList from '@/ui-lib/widgets/StaffList';
import ChooseQuizzesPopup from '@/ui-lib/popups/ChooseQuizzesPopup';
import ConfirmationPopup from '@/ui-lib/popups/ConfirmationPopup';
import NewEmployeePopup from '@/ui-lib/popups/NewEmployeePopup';
import { IUser } from '@/types/types';
import { useGetQuizzesQuery, useGetDepartmentsQuery, useGetUsersQuery } from '@/api/apiv2';

const StyledDiv = styled.div`
  width: 100%;
`;

const Staff: FC = () => {
  const [searchEmployee, setSearchEmployee] = useState('');
  const [searchQuiz, setSearchQuiz] = useState('');

  const [isEmployeeChecked, setIsEmployeeChecked] = useState<number[]>([]);
  const [isQuizChecked, setIsQuizChecked] = useState<number[]>([]);

  const [selectType, setSelectType] = useState<{ id: number, name: string }[]>([{ id: 0, name: 'Все отделы' }]);

  const [isChooseQuizzesPopupOpen, setIsChooseQuizzesPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isNewEmployeePopupOpen, setIsNewEmploeePopupOpen] = useState(false);

  const { data: staff } = useGetUsersQuery();
  const { data: quizzes } = useGetQuizzesQuery();
  const { data: departments } = useGetDepartmentsQuery();

  const [staffOnPage, setStaffOnPage] = useState(staff?.filter(({ role }) => role !== 'AD'));
  const [staffNameFilter, setStaffNameFilter] = useState<IUser[] | undefined>(staffOnPage?.filter(
    ({ firstName, lastName, patronymic }) => (
      firstName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1 ||
      lastName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1 ||
      patronymic.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1
    ),
  ));
  const [departmentsList, setDepartmentsList] = useState<{
    label: string,
    value: number,
  }[] | undefined>(departments?.filter(({ name }) => (
    staff?.filter(({ department }) => department === name).length !== 0
  )).map(({ id, name }) => ({
    label: name,
    value: id,
  })));

  const staffDepartmentFilter = (type: number) => {
    const newType = departments?.filter(({ id }) => id === type) ?? [{ name: 'Все отделы', id: 0 }];
    setSelectType(newType.length === 0 ? [{ name: 'Все отделы', id: 0 }] : newType);
    type === 0
      ? setStaffOnPage(staff)
      : setStaffOnPage(staff?.filter(({ department }) => department === newType[0].name));
    console.log(type, newType, selectType);
  };

  const quizNameFilter = quizzes?.filter(
    ({ name }) => name.toLowerCase().indexOf(searchQuiz.toLowerCase()) > -1,
  );

  useEffect(() => {
    setStaffOnPage(staff);
    setStaffNameFilter(staffOnPage?.filter(
      ({ firstName, lastName, patronymic }) => (
        firstName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1 ||
        lastName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1 ||
        patronymic.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1
      ),
    ));
    setDepartmentsList(departments?.filter(({ name }) => (
      staff?.filter(({ department }) => department === name).length !== 0
    )).map(({ id, name }) => ({
      label: name,
      value: id,
    })));
  }, [staff, quizzes, departments, searchEmployee]);

  return (
    <>
      <StyledDiv>
        <StaffFilter
          departments={[{ label: 'Все отделы', value: 0 }].concat(departmentsList ?? [])}
          setSearch={setSearchEmployee}
          search={searchEmployee}
          type={selectType}
          setType={staffDepartmentFilter}
          setIsChooseQuizzesPopupOpen={setIsChooseQuizzesPopupOpen}
          setIsNewEmploeePopupOpen={setIsNewEmploeePopupOpen}
          isChecked={isEmployeeChecked} />
        <StaffList
          staffList={searchEmployee !== '' ? staffNameFilter : staffOnPage}
          departments={selectType[0].name === 'Все отделы'
            ? departmentsList
            : [{ label: selectType[0].name, value: selectType[0].id }]}
          search={searchEmployee}
          isChecked={isEmployeeChecked}
          setIsChecked={setIsEmployeeChecked} />
      </StyledDiv>
      <ChooseQuizzesPopup
        isChecked={isQuizChecked}
        setIsChecked={setIsQuizChecked}
        quizzes={searchQuiz !== '' ? quizNameFilter : quizzes}
        search={searchQuiz}
        setSearch={setSearchQuiz}
        setIsChooseQuizzesPopupOpen={setIsChooseQuizzesPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        isChooseQuizzesPopupOpen={isChooseQuizzesPopupOpen}
        setIsEmployeeChecked={setIsEmployeeChecked}
        isEmployeeChecked={isEmployeeChecked} />
      <ConfirmationPopup
        title='Квизы назначены'
        icon='check'
        description='Проверить назначение квизов можно в разделе «Назначенные квизы»'
        blueButton='Вернуться к списку'
        whiteButton='Проверить'
        isConfirmationPopupOpen={isConfirmationPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        blueButtonLink=''
        whiteButtonLink='/adm-quizzes' />
      <NewEmployeePopup
        isNewEmployeePopupOpen={isNewEmployeePopupOpen}
        setIsNewEmploeePopupOpen={setIsNewEmploeePopupOpen}
        departments={departmentsList} />
    </>
  );
};

export default Staff;
