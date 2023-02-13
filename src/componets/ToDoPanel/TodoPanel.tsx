import React  from "react";
import { Button } from "../Button/Button";

import styles from './TodoPanel.module.css';
import { useTodo } from "../../utils";

const DEFAULT_TODO = {
  name: '',
  description: ''
};
 
interface AddTodoPanelProps {
  mode: 'add';
}

interface EditTodoPanelProps {
  mode: 'edit';
  editTodo: Omit<Todo, 'id' | 'checked'>;
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps; // общий интерфейс/ с помощью UNION(|) ИЛИ

export const TodoPanel: React.FC<TodoPanelProps> = (props) => {
  const { changeTodo, addTodo } = useTodo();

  const isEdit = props.mode === 'edit'; //нахождение в режиме редактирования или нет
  
  const [todo, setTodo]=React.useState(isEdit ? props.editTodo : DEFAULT_TODO);

  const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = event.target;
    console.log(name)
    setTodo({...todo, [name]: value });
    };  

  const onClick = () => {
    const todoItem = { name: todo.name, description: todo.description };
    if(isEdit) {
      return changeTodo(todoItem);
    }
      
    addTodo(todoItem);
    setTodo(DEFAULT_TODO)
  };
   

 return (
   <div className={styles.todo_panel_container}>
     <div className={styles.fields_container}>
       <div className={styles.field_container}>
         <label htmlFor="name">
           <div>name</div>
           <input
             type="text"
             id="name"
             value={todo.name}
             name="name"
             onChange={onChange}
           />
         </label>
       </div>
       <div className={styles.field_container}>
         <label htmlFor="description">
           <div>description</div>
           <input
             type="text"
             id="description"
             value={todo.description}
             name="description"
             onChange={onChange}
           />
         </label>
       </div>
     </div>

     <div className={styles.button_container}>
       {!isEdit && ( //2. если это НЕ is edit - отобрази эту кнопку
         <Button color="blue" onClick={onClick}>
           ADD
         </Button>
       )}
       {isEdit && (   //1. ЕСЛИ ЭТО is edit - отобрази эту кнопку
         <Button color="blue" onClick={onClick}>
           ADD
         </Button>
       )}
     </div>
   </div>
 );
};