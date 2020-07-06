import React, { useRef, useCallback } from 'react';

import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from 'yup';

import  getValidationErros from "../../utils/getValidationErrors";

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
    const formRef =  useRef<FormHandles>(null);

    /* Lidar com o Submit do form */
    const handleSubmit = useCallback( async (data: object) =>  {
        try {
            formRef.current?.setErrors({});

            /* Criando um Schema de validação para um objeto usando a biblioteca YUP que foi importada */
            const schema =  Yup.object().shape({
                email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });
            /* Utiliza o schema passado o data e para validar */
            await schema.validate(data,{
                abortEarly: false //Ao declarar a propriedade abortEarly como false o Yup ira apresentar todos os erros.
            });
        } catch (err) {
            console.log(err);

            const errors = getValidationErros(err);
            formRef.current?.setErrors(errors);
        }
    }, []);
    return(
    /* Conteiner é um type criando em nossa aplicação */
    <Container>
        <Content>
            <img src={logoImg} alt="GoBarber"/>

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu logon</h1>

                <Input name="email" icon={FiMail} placeholder="E-mail" />

                <Input name="password" icon={FiLock} type="password"  placeholder="Senha" />

                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>

            </Form>
            <FiLogIn/>
            <a href="login">Criar Conta</a>
        </Content>

        <Background/>
    </Container>
)};

export default SignIn;
