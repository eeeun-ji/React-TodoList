import React from 'react';
import './TodoTemplate.scss';
//화면을 가운데에 정렬시켜주며, 앱 타이틀 (일정관리)를 보여준다.
//children으로 내부 JSX를 props로 받아와서 렌더링 해줌.

const TodoTemplate = ({ children }) => {
    return (
        <div className="TodoTemplate">
            <div className="app-title"> 일정관리 </div>
            <div className="content">{children}</div>
        </div>
    );
};
export default TodoTemplate;