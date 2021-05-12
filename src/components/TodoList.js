//todos배열을 props로 받아 오후, 이를 배열 내장 함수 map을 사용해서 여러개의 TOdoListItem 컴포넌트로 변환하여 보여준다.
import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos , onRemove, onToggle }) => {
    return (
        <div className="TodoList">
            {todos.map(todo => ( //배열내장함수 map
                //props로 받아온 todos 배열 
                //-> TodoListItem으로 이뤄진 배열로 변환하여 렌더링
                <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
            ))}
        </div>
    );
};

export default TodoList;