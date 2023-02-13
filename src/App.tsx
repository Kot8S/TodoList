import React from 'react';

import { Header } from './componets/Header/Header';
import { TodoPanel } from './componets/ToDoPanel/TodoPanel';
import { TodoList } from './componets/TodoList/TodoList';
import { TodoProvider } from './utils';

import styles from './App.module.css';


export const App = () => (
  < TodoProvider>
    <div className={styles.app_container}>
      <div className={styles.container}>
        <Header/> 
        <TodoPanel mode='add'/>    
        <TodoList/>
      </div>
    </div>
  </TodoProvider>
);
 