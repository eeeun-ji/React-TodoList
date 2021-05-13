//useState를 사용하여 todos라는 상태정의
//todos를 TodoList의 props로 전달
//(case "useReducer 사용") 중괄호에 useState 대신, useReducer 사용
import React, { useState , useRef, useCallback } from 'react'; 
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

//많은 데이터(2500개)를 추가하기 위함
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

/* 배열 상태를 업데이트 하는 과정에서 최신 상태의 todos를 참조한다
이때, 함수가 계속 만들어지는 상황을 방지하는 방법 2가지가 있다.
1) useState의 함수형 업데이트
2) useReducer 사용

App.js에서는 (1)번의 방법 사용
주석에서는 (2)번의 방법 기술
*/

/******** useReducer 사용 *******
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': //새로추가
      return todos.concat(action.todo);
    case 'REMOVE': //제거
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE': //토글
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo);
    default:
      return todos;
  }
}
*/

const App = () => { //랜더링

  //todos 배열 안에 들어있는 객체 
  const [todos, setTodos] = useState(createBulkTodos);

  /*onInsert + useState의 함수형 업데이트*/
  
  /*고유값으로 사용될 id , ref를 사용하여 변수 담기
    id값은 렌더링 되는 정보가 아니기때문에 새로운 항목을 만들때 참조되는 값일뿐. */
  const nextId = useRef(2501); 

  /* props로 전달해야 할 함수를 만들때는
    useCallback 을 사용하여 함수를 감싸는것이 생활화 해야함 */
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos => todos.concat(todo));
      nextId.current += 1; //nextId 1씩 더하기
    }, []);

    /*onRemove + useState의 함수형 업데이트*/

    /* filter 내장 함수 : 기존의 배열은 그대로 둔 상태에서 
      특정 조건을 만족하는 원소들만 따로 추출하여 새로운 배열을 만들어준다.
      -> 조건을 확인해
    */
  const onRemove = useCallback(
    id => {
      setTodos(todos => todos.filter(todo => todo.id !== id));
    }, []);


  /*onToggle 수정 기능 + useState의 함수형 업데이트*/
  const onToggle = useCallback(
    id => {
      setTodos(
        todos =>
          todos.map(todo =>
            /*todo.id 가 현 id값이 같을때, 새로운 객체를 생성, 
            but, 다를때 변화를 주지 않고 처음 받아 왔던 상태 그대로 반환 */
            todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    }, []);
  
  /******** useReducer 사용******
  const App = () => {
    const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

    //고유값으로 사용될 id , ref를 사용하여 변수 담기
    const nextId = useRef(2501);

    const onInsert = useCallback(text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({ type: 'INSERT', todo });
      nextId.current += 1;
    }, []);

    const onRemove = useCallback(id => {
      dispatch({ type: 'REMOVE', id });
    }, []);

    const onToggle = useCallback(id => {
      dispatch({ type: 'TOGGLE', id });
    }, []);
  } 
  
  */

  return (
    <TodoTemplate>
      <TodoInsert onInsert={ onInsert } />
      <TodoList todos={ todos } onRemove={ onRemove } onToggle={ onToggle }/>
    </TodoTemplate>
  );
};

export default App; 