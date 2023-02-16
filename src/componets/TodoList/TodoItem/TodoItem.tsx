import React from "react";
import { Button } from "../../Button/Button";


import styles from './TodoItem.module.css';

interface TodoItemProps {
    todo: Todo;
    checkTodo: (id: Todo['id']) => void;
    deleteTodo: (id: Todo['id']) => void;
    selectTodoIdForEdit: (id: Todo['id']) => void;
    opacity?: number;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, checkTodo, deleteTodo, selectTodoIdForEdit, opacity }) => {

  return (
    <div className={styles.todo_item_container}>
    <div>
       <div
        aria-hidden
        style={{
           opacity: opacity,
           textDecoration: todo.checked ? 'line-throght' : 'none'
        }}
        onClick={() => checkTodo(todo.id)}
        className={styles.todo_item_title}
      >
        {todo.name}
      </div>
      <div aria-hidden className={styles.todo_item_description}>
        {todo.description}
      </div>
    </div>
    <div className={styles.todo_item_button_container}>
      <Button color='orange' onClick={(e) => selectTodoIdForEdit(todo.id)}>EDIT </Button>
      <Button color='red' onClick={() => deleteTodo(todo.id)}>
        DELETE
      </Button>
     </div>
   </div>
  )
}; 