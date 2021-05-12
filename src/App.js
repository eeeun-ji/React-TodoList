//useState를 사용하여 todos라는 상태정의
//todos를 TodoList의 props로 전달
import React, { useState , useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => { //랜더링

  //todos 배열 안에 들어있는 객체 
  const [todos, setTodos] = useState([
    {
      id : 1, //고유 id
      text : '리액트 기초 알아보기', //내용
      checked : true, //완료 여부
    },

    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: true,
    },

    {
      id : 3,
      text: '일정 관리 앱 만들어 보기',
      checked : false,
    },
  ]);

  /*onInsert*/
  
  /*고유값으로 사용될 id , ref를 사용하여 변수 담기
    id값은 렌더링 되는 정보가 아니기때문에 새로운 항목을 만들때 참조되는 값일뿐. */
  const nextId = useRef(4); 

  /* props로 전달해야 할 함수를 만들때는
    useCallback 을 사용하여 함수를 감싸는것이 생활화 해야함 */
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; //nextId 1씩 더하기
    },
    [todos],
  );

    /*onRemove*/

    /* filter 내장 함수 : 기존의 배열은 그대로 둔 상태에서 
      특정 조건을 만족하는 원소들만 따로 추출하여 새로운 배열을 만들어준다.
      -> 조건을 확인해
    */
  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );


  /*onToggle 수정 기능*/
  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          /*todo.id 가 현 id값이 같을때, 새로운 객체를 생성, 
          but, 다를때 변화를 주지 않고 처음 받아 왔던 상태 그대로 반환 */
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );
  
  return (
    <TodoTemplate>
      <TodoInsert onInsert={ onInsert } />
      <TodoList todos={todos} onRemove={onRemove} onToggle={ onToggle }/>
    </TodoTemplate>
  );
};

export default App; 