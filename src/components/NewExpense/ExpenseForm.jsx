import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = () => {
  // 01-1 :하나이상의 상태를 다루는 방법 : useState()를 한번 이상 호출
  // const [enteredTitle, setEnteredTitle] = useState('');
  // const [enteredAmount, setEnteredAmount] = useState('');
  // const [entereDate, setEnteredDate] = useState('');

  // 01-2 : state한번으로 가는 방법
  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
  });

  // 키보드를 누를때마다 사용자가 입력한값을 가져와서 저장하고 싶다
  // document.getElementById('').addEventListener('click', (event)=>{})
  const titleChangeHandler = e => {
    // setEnteredTitle(e.target.value); // 값을 저장한뒤 나중에 폼을 넘겨줫을떄 사용할 수 있게
    // setUserInput({
    //   ...userInput, // 하나의값만 의존해서 다른값들을 업데이트하구있음 -> 상태를 업데이트 할때마다 이런식으로 하면 곤란
    //   enteredTitle: e.target.value });

    // prevState:안에 있는 함수에서 이 상태가 가장 최신의 상태라는것과 항상 계획된 상태의 업데이트를 염두에 두고있다라는걸 보장
    setUserInput(prevState => {
      return { ...prevState, enteredTitle: e.target.value };
    });
  };

  const amountChangeHandeler = e => {
    // setEnteredAmount(e.target.value); // 값을 저장한뒤 나중에 폼을 넘겨줫을떄 사용할 수 있게
      setUserInput(prevState => {
      return { ...prevState, enteredAmount: e.target.value };
    });
  };

  const dateChangeHandler = e => {
    // setEnteredDate(e.target.value); // 값을 저장한뒤 나중에 폼을 넘겨줫을떄 사용할 수 있게
    // 모든 데이터가 사라지지 않도록 관리해야함 -> 업데이트 하지않은 값들을 수동으로 넘겨줘야함
    setUserInput(prevState => {
      return { ...prevState, enteredDate: e.target.value };
    });
  };

  return (
    <form>
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
      </div>
    </form>
  );
};

export default ExpenseForm;
