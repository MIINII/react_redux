import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import { useState } from 'react';

const Expenses = props => {
  const [filteredYear, setFilteredYear] = useState('2020');

  const filterChangeHandler = selectYear => {
    console.log('🚀 * Expenses * Expenses', selectYear);
    // flterChangHandler가 실행될때마다 파라미터로 받은 selectYear를 setFilteredYear()에 설정
    setFilteredYear(selectYear);
  };

  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
        {/* 동적인 구문 실행 */}
        {props.items.map(expense => (
          <ExpenseItem title={expense.title} amount={expense.amount} date={expense.date} />
        ))}
      </Card>
    </div>
  );
};

export default Expenses;