import React from 'react';
import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpenseseList = props => {
  // let expensesContent = <p>읎다</p>;

  // if (props.items.length > 0) {
  //   expensesContent = ;
  // }
  
  // 아이템이 없을때 반환하는것 : 조건부컨텐츠를 처리하는 다른 방법
  // 만약 다양한 조건에서 컴포넌트가 반환하는 것이 전부 바뀌면 이렇게 사용하면된다!
  if(props.items.length === 0){
    // 데이터가 사라지고 컨텐츠가 변경된다면 반환하는곳에 항상 if문 추가 가능
    return <h2 className='expenses-list__fallback'>
      찾을수가 읎어요
    </h2>
  }

  return <ul className='expenses-list'>
    {props.items.map(expense => <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} />)}
  </ul>;
};

export default ExpenseseList;
