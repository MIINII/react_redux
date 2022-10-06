import React from 'react';
import ExpensesFilter from '../Expenses/ExpensesFilter';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

// 01. 버튼을 클릭했을때 폼이 보여야한다.
// 02. 그 이외에는 폼이 숨겨져 있어야한다.
// 03. 조건부로 렌더링할 새로운 state가 필요 -> 컴포넌트에 state를 추가

const NewExpense = props => {
  const [isEditing, setIsEditing] = React.useState(false);

  const saveExpenseDataHandler = enteredExpenseData => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    console.log('🚀 ~ saveExpenseDataHandler ~ expenseData', expenseData);
    props.onAddExpense(expenseData);
    // 폼이 제출되고 나서 닫기위한 함수
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className='new-expense'>
      {/** @on: 속성에 대한값은 함수(컴포넌트 내부에서 어떤일이 벌어졌을때 작동되는 함수) */}

      {!isEditing && <button onClick={startEditingHandler}>추가하기</button>}
      {isEditing && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={stopEditingHandler} />}
    </div>
  );
};

export default NewExpense;
