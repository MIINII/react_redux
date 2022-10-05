import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
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

  let expensesContent = <p>읎다</p>;

  if (filteredExpenses.length > 0) {
    expensesContent = filteredExpenses.map(expense => <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} />);
  }

  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
        {/* 동적인 구문 실행 */}
        {/* &연산자를 추가하고 조건을 만족했을때 랜더링하고 싶은 컨텐츠를 넣는다! */}
        {expensesContent}
      </Card>
    </div>
  );
};

export default Expenses;
