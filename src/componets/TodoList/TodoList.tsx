import React from "react";
import { useTodo } from "../../utils";

import { TodoPanel } from "../ToDoPanel/TodoPanel";
import { TodoItem } from "./TodoItem/TodoItem";


export const TodoList: React.FC = () => {  
  //FunctionComponent- реактерский функционлаьный компонент принимает в себя пропсы, описанные в угловых ковычках
 const { todos, todoIdForEdit, checkTodo, deleteTodo,selectTodoIdForEdit } = useTodo();

  return (
    <div>
      {todos.map((todo) => {
        if (todo.id === todoIdForEdit)
          return (
            <TodoPanel
              key={todo.id}
              mode='edit'
              editTodo={{ name: todo.name, description: todo.description }}
            />
          );
  
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkTodo={checkTodo}
            deleteTodo={deleteTodo}
            selectTodoIdForEdit={selectTodoIdForEdit}
          />
        );
      })}
    </div>
  );
};



