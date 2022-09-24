# <span style="font-weight:700">✨ React / Redux 공부하기</span>

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
