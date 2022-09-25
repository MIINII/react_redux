import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = onSaveExpenseData => {
  // 01-1 :하나이상의 상태를 다루는 방법 : useState()를 한번 이상 호출
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  const titleChangeHandler = e => {
    setEnteredTitle(e.target.value); // 값을 저장한뒤 나중에 폼을 넘겨줫을떄 사용할 수 있게
  };

  const amountChangeHandeler = e => {
    setEnteredAmount(e.target.value); // 값을 저장한뒤 나중에 폼을 넘겨줫을떄 사용할 수 있게
  };

  const dateChangeHandler = e => {
    setEnteredDate(e.target.value); // 값을 저장한뒤 나중에 폼을 넘겨줫을떄 사용할 수 있게
  };

  const submitHandler = e => {
    e.preventDefault(); //기본 요청이 보내지는걸 막아준다 -> page 재로드 방지

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };
    onSaveExpenseData(expenseData);
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
    // button type이 submit이라면 폼 대신에 클릭이된다면 이전체 폼요소는 수신할수 있는 이벤트를 생략
    // submit에 반응하는 이 폼에서 폼이 제출될때마다 일부 함수를 실행한다 -> submitHandler
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__constrol'>
          <label>Title</label>
          <input type='text' onChange={titleChangeHandler} />
        </div>

        <div className='new-expense__constrol'>
          <label>Amount</label>
          <input type='number' min='0.01' step='0.01' onChange={amountChangeHandeler} />
        </div>

        <div className='new-expense__constrol'>
          <label>Date</label>
          <input type='date' min='2020-01-01' max='2022-12-31' onChange={dateChangeHandler} />
        </div>
      </div>

      <div className='new-expense__actions'>
        <button type='submit'>Add Expense</button>
        {/* 브라우저에 내장된 기본동작과 웹페이지에 내장된 폼이 있기때문에 onClick이벤트는 별로 좋지아늠 */}
      </div>
    </form>
  );
};

export default ExpenseForm;
