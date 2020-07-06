import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

/*
    Como não iremos alterar nenhuma propriedade colocamos o objeto como type
*/
   type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({children, ...rest}) =>
(
    <Container>
        <button type="button" {...rest}>
            {children}
        </button>
    </Container>
);

export default Button;
