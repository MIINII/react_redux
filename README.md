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

### **키보드를 누를때마다** 사용자가 입력한값을 가져와서 저장하고 싶다

`document.getElementById('').addEventListener('click', (event)=>{})`

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
