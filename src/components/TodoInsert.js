//새로운 항목을 입력하고 추가할수 있는 컴포넌트
//state
import React, { useState, useCallback } from 'react';
//icon사용 : icon명 = MdAdd
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {

    //input 상태를 관리하며
    //App 컴포넌트에는 todos 배열에 새로운 객체를 추가하는 함수

    //input에 입력하는 값을 관리할수 있도록 useState사용, value라는 상태 정의
    const [value, setValue] = useState(''); 

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);


    //submit 함수
    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue(''); //value값 초기화

            //submit 이벤트는 브라우저에서 새로고침을 발생시킴
            //이를 방지하기 위해 preventDefault 함수 호출
            e.preventDefault();
        },
        [onInsert, value],
    );

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input placeholder="할 일을 입력하세요"
                value={value}
                onChange={onChange}
            />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;