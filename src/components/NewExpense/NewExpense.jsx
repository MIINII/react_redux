import React from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = props => {
  const saveExpenseDataHandler = enteredExpenseData => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    console.log('🚀 ~ saveExpenseDataHandler ~ expenseData', expenseData);
    props.onAddExpense(expenseData);
  };

  return (
    <div className='new-expense'>
      {/** @on: 속성에 대한값은 함수(컴포넌트 내부에서 어떤일이 벌어졌을때 작동되는 함수) */}
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
};

export default NewExpense;
