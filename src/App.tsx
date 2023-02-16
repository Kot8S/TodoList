import React from 'react';

import { Header, TodoPanel } from './componets';
import { TodoItem } from './componets/TodoList/TodoItem/TodoItem';
import { ReactSortable } from "react-sortablejs";

import styles from './App.module.css';

const DEFAULT_TODO_LIST = [
  { id: 1, name: 'task 1', description: 'description 1', checked: false },
  { id: 2, name: 'task 2', description: 'description 2', checked: false },
  {
    id: 3,
    name: 'task 3',
    description:
      'description 3',
    checked: true
  }
];

export const App = () => {
  const [todoIdForEdit, setTodoIdForEdit] = React.useState<number | null>(null);
  const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);
  const [newIndex, setNewIndex] = React.useState<undefined | number>();

  const selectTodoIdForEdit = (id: Todo['id']) => {
    setTodoIdForEdit(id);
  };

  const deleteTodo = (id: Todo['id']) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = ({ name, description }: Omit<Todo, 'id' | 'checked'>) => {
    setTodos([...todos, { id: todos[todos.length - 1].id + 1, description, name, checked: false }]);
  };

  const checkTodo = (id: Todo['id']) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  const changeTodo = ({ name, description }: Omit<Todo, 'id' | 'checked'>) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoIdForEdit) {
          return { ...todo, name, description };
        }
        return todo;
      })
    );
    setTodoIdForEdit(null);
  };

  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <Header todoCount={todos.length} />
        <TodoPanel mode="add" addTodo={addTodo} />
        <div>
          <ReactSortable list={todos} setList={setTodos}
            onChoose={(data)=>{
              console.log('data: ', data);
              setNewIndex(data.oldIndex)
              
            }}
            onSelect={(data)=>{
              console.log('data select: ', data);
              
            }}
            onUnchoose={()=>{
              setNewIndex(undefined);
            }}>
          {todos.map((todo, index) => {
            if (todo.id === todoIdForEdit)
              return (
                <TodoPanel
                  key={todo.id}
                  mode="edit"
                  changeTodo={changeTodo}
                  editTodo={{ name: todo.name, description: todo.description }}
                />
              );

            return (
              <TodoItem
                key={todo.id}
                opacity={index === newIndex ? 0 : 1}
                todo={todo}
                checkTodo={checkTodo}
                deleteTodo={deleteTodo}
                selectTodoIdForEdit={selectTodoIdForEdit}
              />
            );
          })}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
};
