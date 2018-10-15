import React from 'react';
import s from './TodoItem.module.css';
import cx from 'classnames/bind';

const classes = cx.bind(s);

const TodoItem = ({
   title,
   id,
   completed,
   onClick,
   onRemoveClick,
})=>{
    const className = classes('container', { completed });      
    return (
        <div  className={s.container}>
            <div 
                onClick={() => onClick(id)}
                className={className}
            >
                {title}
            </div>
            <button onClick={()=> onRemoveClick(id)}>x</button>
        </div>
    )
    
};


    

export default TodoItem