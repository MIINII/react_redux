import { useState } from 'react';
import { click } from '@testing-library/user-event/dist/click';
import Card from '../UI/Card';
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';

const ExpenseItem = props => {
  const [title, setTitle] = useState(props.title);
  
  const clickHandler = () => {
    setTitle('Updated!');
    console.log('🚀 ~ ExpenseItem ~ title', title)
    
  };

  return (
    <Card className='expense-item'>
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{title}</h2>
        <div className='expense-item__price'>${props.amount}</div>
      </div>
      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
};

export default ExpenseItem;
