import './Expenses.css';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpenseseList from './ExpensesList';
import { useState } from 'react';

const Expenses = props => {
  const [filteredYear, setFilteredYear] = useState('2020');

  // 연도 선택 핸들러
  const filterChangeHandler = selectYear => {
    console.log('🚀 ⁝ filterChangeHandler ⁝ selectYear', selectYear);
    // flterChangHandler가 실행될때마다 파라미터로 받은 selectYear를 setFilteredYear()에 설정
    setFilteredYear(selectYear);
  };

  // expense에서 date를 추출하여 filteredYear랑 비교
  const filteredExpenses = props.items.filter(expense => {
    return expense.date.getFullYear().toString() === filteredYear;
  });
  console.log('🚀 ⁝ filteredExpenses ⁝ filteredExpenses', filteredExpenses);

  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
        {/* 동적인 구문 실행 */}
        {/* &연산자를 추가하고 조건을 만족했을때 랜더링하고 싶은 컨텐츠를 넣는다! */}
        <ExpenseseList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
