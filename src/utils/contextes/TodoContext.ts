import React from 'react';

export interface TodoContextProps {   //в контексте лежит массив наших тудушек
    todos: Todo[];
    todoIdForEdit: Todo['id'] | null;
    addTodo: ({ name, description }: Omit<Todo, 'checked' | 'id'>) => void;
    changeTodo: ({ name, description }: Omit<Todo, 'checked' | 'id'>) => void;
    checkTodo: (id: Todo['id']) => void;
    deleteTodo: (id: Todo['id']) => void;
    selectTodoIdForEdit: (id: Todo['id']) => void;
}

export const TodoContext = React.createContext<TodoContextProps>({  //вызываем метод реакта (createContext), после прокидываем пропс
    todos: [],  //описываем чему все равно по дефолту ( они будут пустыми)
    todoIdForEdit: null,
    addTodo: () => {},
    deleteTodo: () => {},
    changeTodo: () => {},
    checkTodo: () => {},
    selectTodoIdForEdit: () => {}
});
