//각 할일 항목에 대한 정보를 보여주는 컴포넌트
//todo 객체를 props로 받아와서 상태에 따라 다른 스타일의 UI를 보여준다
import React from 'react';
import {
    MdCheckBoxOutlineBlank, //빈박스
    MdCheckBox, //할일이 완료되었을때 체크된 상태를 보여주기 위한 icon
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
    const { id, text, checked } = todo;

    return (
        <div className="TodoListItem-virtualized" style={style}>
            <div className="TodoListItem">
                <div
                    className={cn('checkbox', { checked })}
                    onClick={() => onToggle(id)}
                >
                    {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                    <div className="text">{text}</div>
                </div>
                <div className="remove" onClick={() => onRemove(id)}>
                    <MdRemoveCircleOutline />
                </div>
            </div>
        </div>
    );
};

/* 컴포넌트의 props가 바뀌지 않았다면, 리렌더링을 하지 않도록 설정 -> 성능최적화 */
export default React.memo(TodoListItem, (prevProps, nextProps) => prevProps.todo === nextProps.todo,);