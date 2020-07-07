import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertTriangle } from 'react-icons/fi';

import { useField } from "@unform/core";


import { Container, Error } from './styles';


/* O componente input possue também a responsabilidade de registro dos dados enviados no input dentro dos formulários */



/* Crinando uma interface para o componente e extendendo do InputHTMLAttributes
   depois subscrevendo algumas propriedade  */
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

/* Utilizando a biblioteca @unform/core da RocketSeat */
const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest }) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const [isFocused, setIsFocused] =  useState(false);
   const [isFilled, setIsFilled] = useState(false);
   const { fieldName, defaultValue, error, registerField } = useField(name);

    /* Criada uma unica vez independente do componente ser criado várias vezes */
    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

   /*
      Lidando com o onBlur do Input
      No caso abaixo, criamos uma const com uma Arrow function que recebe um useCallback
      para todas as vezes que a function principal React.FC e criada a const handle seria criado
      mas quando usamos os parametros como vazio [] ela nunca será alterado oseu valor
   */
   const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        /* Caso o input tenha um valor o mesmo terá o  */
       /*  if(inputRef.current?.value){
            setIsFilled(true);
        } else {
            setIsFilled(false);
        } */

        /* Usando validação booleana*/
        setIsFilled(!!inputRef.current?.value);
   }, []);

    /* Registrando um valor ao campo via registerField() */
    useEffect(()=>{
        registerField({
            name:fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

   return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
    />
    {/* Caso exista o erro */}
    {error &&
        <Error title={error}>
             <FiAlertTriangle color="#c53030" size={20} />
        </Error>}
    </Container>
)};

export default Input;
