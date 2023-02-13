import React from 'react';

import { TodoContext } from './TodoContext'

interface TodoProviderProps {
    children: React.ReactNode;  //будет принимать чилдренов, котор равны реакт ноде  
}

const DEFAULT_TODO_LIST = [
  { id: 1, name: 'task 1', description: 'description 1', checked: false },
  { id: 2, name: 'task 2', description: 'description 2', checked: false },
  {
    id: 3,
    name: 'task 3',
    description:
      'so long task description so long task description so long',
    checked: true
  }
];


export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST); //использование хука для списка, чтобы могли с ним манипулировать
  const [todoIdForEdit, setTodoForEdit] = React.useState<Todo["id"] | null>(null);

  const selectTodoIdForEdit = (id: Todo["id"]) => {
    setTodoForEdit(id);
  };

  const addTodo = ({ name, description }: Omit<Todo, "checked" | "id">) => {
    setTodos([...todos, { id: (todos[todos.length - 1]?.id || 0) + 1, description, name, checked: false }]);
  };

  const checkTodo = (id: Todo["id"]) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const changeTodo = ({ name, description }: Omit<Todo, "checked" | "id">) => {
    // Omit вырезает поля после запятой -{ name: string, description: string }
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoIdForEdit) {
          return { ...todo, name, description };
        }
        return todo;
      })
    );
    setTodoForEdit(null);
  };

  const value = React.useMemo(
    () => ({
      //  мемоизация-в useMemo будем передавать все, что нужно контексту
      todoIdForEdit,
      todos,
      deleteTodo,
      changeTodo,
      addTodo,
      selectTodoIdForEdit,
      checkTodo,
    }),
    [ todoIdForEdit, todos ]
  );
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>; //импортируем TodoContext, взять с него провайдер и обернуть наших чилдренов, прокидывая контекст нашего value
};