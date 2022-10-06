# <div style="font-weight:700">✨ React / Redux 공부하기</div>

## 🎃 `useState()`를 통한 상태 관리

```jsx
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

  const expensData = {
    title: enteredTitle,
    amount: enteredAmount,
    date: new Date(enteredDate),
  };
  console.log('🚀 ~ submitHandler ~ expensData', expensData);
};
```

```jsx
// 01-2 : state한번으로 가는 방법
const [userInput, setUserInput] = useState({
  enteredTitle: '',
  enteredAmount: '',
  enteredDate: '',
});

const titleChangeHandler = e => {
  // prevState:안에 있는 함수에서 이 상태가 가장 최신의 상태라는것과 항상 계획된 상태의 업데이트를 염두에 두고있다라는걸 보장
  setUserInput(prevState => {
    return { ...prevState, enteredTitle: e.target.value };
  });
};

const amountChangeHandeler = e => {
  setUserInput(prevState => {
    return { ...prevState, enteredAmount: e.target.value };
  });
};

const dateChangeHandler = e => {
  // 모든 데이터가 사라지지 않도록 관리해야함 -> 업데이트 하지않은 값들을 수동으로 넘겨줘야함
  setUserInput(prevState => {
    return { ...prevState, enteredDate: e.target.value };
  });
};
// */

const submitHandler = e => {
  e.preventDefault(); //기본 요청이 보내지는걸 막아준다 -> page 재로드 방지

  const expensData = {
    title: enteredTitle,
    amount: enteredAmount,
    date: new Date(enteredDate),
  };
  console.log('🚀 ~ submitHandler ~ expensData', expensData);
};
```

## 🍯 꿀팁

1.  **키보드를 누를때마다** 사용자가 입력한값을 가져와서 저장하고 싶다

    > `document.getElementById('').addEventListener('click', (event)=>{})`

2.  `onSubmitHandler`를 클릭하면 값이 초기화 되었으면 좋겟다

    ```jsx
    const submitHandler = e => {
      e.preventDefault(); //기본 요청이 보내지는걸 막아준다 -> page 재로드 방지

      const expenseData = {
        title: enteredTitle,
        amount: enteredAmount,
        date: new Date(enteredDate),
      };
      console.log('🚀 > submitHandler > expenseData', expenseData);

      // 함수에 매개변수로 부모에게 데이터 전달 가능
      props.onSaveExpenseData(expenseData);

      // form 밸류를 초기화!!! 신기하당
      setEnteredTitle('');
      setEnteredAmount('');
      setEnteredDate('');
    };
    ```

## 🎃 자식에서 부모로 넘기기

> **" 함수에 매개변수로 부모에게 데이터 전달 가능 "**

```jsx
// NewExpense.jsx
...
...
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
```

```jsx
// ExpenseForm.jsx

...
...
const submitHandler = e => {
  e.preventDefault(); //기본 요청이 보내지는걸 막아준다 -> page 재로드 방지

  const expenseData = {
    title: enteredTitle,
    amount: enteredAmount,
    date: new Date(enteredDate),
  };
  console.log('🚀 > submitHandler > expenseData', expenseData);

  // 함수에 매개변수로 부모에게 데이터 전달 가능
  props.onSaveExpenseData(expenseData);

  // form 밸류를 초기화!!! 신기하당
  setEnteredTitle('');
  setEnteredAmount('');
  setEnteredDate('');
};
```

## 🎃 동적라우팅...? State저장 목록 사용

<div style='color:#8ac'><u>"새로운 expense가 추가될때마다 expesne 배열을 어떻게 업뎃하는지?"</u></div>

-> `useState()` 를 사용하여 관리해보자!

1.  `useSate(DUMMY_EXPENSE)`를 호출해서 더미데이터를 전달 가능 : 연습용 데이터인 초기값
2.  `const [expenses, setExpense] = useState(DUMMY_EXPENSE)` : 디스트럭쳐링(구조분해) 사용 **[expense와 함수를 업데이트 해주는 setExpenses에 접근하기 위해]**
3.  새로운 expense를 추가해주는 `addExpenseHandler` => (기존 expense + 새로운 expense)
4.  스프레드 연산자를 이용하여 기존의 배열에 새로운 배열 추가

```jsx
const addExpenseHandler = expense => {
  setExpense([expense, ...expenses]);
};
```

### 그래서 어떻게 써야하느냐~

```jsx
const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = expense => {
    // console.log('🚀 * addExpenseHandler * expense', expense);
    // 상태 업데이트
    setExpenses(prevExpenses => {
      return [expense, ...prevExpenses]; //익스펜스에 이전익스펜스 추가
    });
  };

  return (
    <div className='App'>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
```

## 🎃 `key()` 이 필요한 이유

> 리액트는 데이터를 로드하는데 특별한 개념을 갖는다! 이개념은 바로 **리액트가 발생할 수 있는 어떤 성능 손실이나 버그 없이 효과적으로 목록들을 업뎃하고 렌더링 할수 있게 보장하는 존재**

리액트한테는 각각 아이템이 다 비슷해보입니다. 그래서 새로운 아이템이 어느 위치에 추가 되어야하는지를 잘 모름 👉 <span style='color:#56A5EC; font-size:18px'>_새로운 아이템이 어디에 추가되어야 하는지 리액트한테 알려줘야해!_</span>

위에 작업을 아이템 목록이 출력되는 곳에가서 할수있음<span style='color:#E42217; font-size:18px'>(=`key props`추가)</span>

1. key는 프롭대신 어떤 컴포넌트에도 추가 가능! 리액트가 인식할수 있게 도와주는 역할! 그래서 **아이템별로 고유값을** 정해줘야 한다.
2. 고유 id가 없을때에는 두번쨰 인자를 사용하면 되는데 이는 map에 전달하는 함수에서 자동으로 얻어짐(그 함수는 index를 자동으로 관리해줌) : 추천X -> 버그를 발생시킬 수 있기 때문(특정한 아이템에 대한 인덱스가 항상 똑같기때문 + 아이템 컨텐츠에 직접적으로
   첨부된 것이 아니기 때문)

   ⁘ <span style='color:#56A5EC'><u>**특정 컨텐츠를 갖는 모든 아이템들은 무족권 고유한 id를 갖고 있어야함!**</u></span>

3. **`map()`을 사용할땐 무족권 key값을 주자!**

## 🎃 필터(filter)기능 작동하게 하기

- `filter()`는 배열을 필터링해줍니다. 이 메소드에는 함수를 전달할 수 있다! <span style='font-size:18px'>그래서 `true`를 반환하면 특정 아이템은 남겨지고 `false`이면 남지않는다! 그리고 새로운 배열로 추가됨</span>

```jsx
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
        {/* 고유 id(ex expense)가 없을때는 두번째 인자를 사용하면 됨(map에 전달하는 함수에서 자동으로 얻어짐) */}
        {filteredExpenses.map((expense, index) => (
          <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} />
          // key는 프롭대신 어떤 컴포넌트에도 추가할 수 있음! 리액트가 인식할수 있게 도와줌! 그래서 아이템별로 고유값을 정해줘야함
        ))}
      </Card>
    </div>
  );
};

export default Expenses;
```

## 🎃 조건부 컨텐츠 : 데이터가 없을때에는 메세지를 띄우고싶어여

> JSX코드에 동적인 표현식을 추가하고 조건을 사용하면 된다!(삼항연산자 사용)

```jsx
// Expenses.jsx
...
...
...
  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
        {/* 동적인 구문 실행 */}
        {filteredExpenses.length === 0 ? <p style={{color:'#fff'}}>읎다</p> : filteredExpenses.map(expense => <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} />)}
        {/* 고유 id(ex expense)가 없을때는 두번째 인자를 사용하면 됨(map에 전달하는 함수에서 자동으로 얻어짐) */}
        {/* {filteredExpenses.map((expense, index) => (
          <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} />
          // key는 프롭대신 어떤 컴포넌트에도 추가할 수 있음! 리액트가 인식할수 있게 도와줌! 그래서 아이템별로 고유값을 정해줘야함
        ))} */}
      </Card>
    </div>
  );
};
```

### 아래 두개는 같은 코드입니다(자바스크립트구문 남용하기 ㅎㅋ)

```jsx
{
  filteredExpenses === 0 && <p style={{ color: '#fff' }}>읎다</p>;
}
```

```jsx
{
  filteredExpenses.length === 0 ? <p style={{ color: '#fff' }}>읎다</p> : filteredExpenses.map(expense => <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} />);
}
```

=> 두개를 합치면?

```jsx
{
  filteredExpenses === 0 && <p style={{ color: '#fff' }}>읎다</p>;
}
{
  filteredExpenses.length > 0 && filteredExpenses.map(expense => <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} />);
}
```

### 💥 좀 더 깔끔하게 : **변수추가하기**

> 반환하기 전에 if문을 편집할 수 있기 때문에 변수를 추가하는 방법을 쓴다.

```jsx
// Expenses.jsx 를 더 깔끔하게!
...
...
...
let expensesContent = <p>읎다</p>;

if (filteredExpenses.length > 0) {
  expensesContent = filteredExpenses.map(expense => <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} />);
}

return (
  <div>
    <Card className='expenses'>
      <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
      {expensesContent}
    </Card>
  </div>
);
```

## 🎃 조건 명령문 반환 추가

```jsx
// Expenses.jsx
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
  if (props.items.length === 0) {
    // 데이터가 사라지고 컨텐츠가 변경된다면 반환하는곳에 항상 if문 추가 가능
    return <h2 className='expenses-list__fallback'>찾을수가 읎어요</h2>;
  }

  return (
    <ul className='expenses-list'>
      {props.items.map(expense => (
        <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} />
      ))}
    </ul>
  );
};

export default ExpenseseList;
```

``` jsx
// ExpensesItem.jsx
import { useState } from 'react';
import { click } from '@testing-library/user-event/dist/click';
import Card from '../UI/Card';
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';

const ExpenseItem = props => {
  // const [title, setTitle] = useState(props.title);

  // const clickHandler = () => {
  //   setTitle('Updated!');
  //   console.log('🚀 ~ ExpenseItem ~ title', title);
  // };

  return (
    <li>
      <Card className='expense-item'>
        <ExpenseDate date={props.date} />
        <div className='expense-item__description'>
          <h2>{props.title}</h2>
          <div className='expense-item__price'>${props.amount}</div>
        </div>
        {/* <button onClick={clickHandler}>Change Title</button> */}
      </Card>
    </li>
  );
};

export default ExpenseItem;

```
