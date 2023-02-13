import React from 'react'

import styles from './Button.module.css'

interface ButtonProps extends React.ComponentPropsWithRef<'button'>  { //extends наследование объектов
    color: 'orange' | 'blue' | 'red' //новый объект создан на основании React.ComponentPropsWithRef<'button'> с новым полем color
}

export const Button: React.FC<ButtonProps > = ({children,color, onClick, ...props}) => { //FunctionComponent- реактерский функционлаьный компонент принимает в себя пропсы, описанные в угловых ковычках
    const className = `${styles.button} ${styles[`button_${color}`]}`;
     
    return (
        <button className={className} onClick={onClick} {...props}> 
         {children}
        </button>
    );
};