import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({
   item,
   onTodoClick,
   onTodoRemoveClick,
})=>(
    <ul style={{listStyleType:'none'}} >
       {item.map(i=>(
       <TodoItem 
       onRemoveClick={onTodoRemoveClick} 
       onClick={onTodoClick} 
       key={i.id} 
       {...i} />
           ))}
    </ul>
);


    

export default TodoList