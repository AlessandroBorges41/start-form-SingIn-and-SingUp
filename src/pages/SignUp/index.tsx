import React, {useCallback, useRef} from 'react';

import {FiArrowLeft, FiMail, FiUser, FiLock} from 'react-icons/fi';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";

/* Importa tudo de uma biblioteca como uma variavel */
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";


import api from '../../services/api';

import { useToast } from "../../hooks/toast";

import getValidationErros from "../../utils/getValidationErrors";

import logoImg from '../../assets/logo.svg';

import { Container, Content, AnimationContainer, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

/* Tipando os dados para envia a Api */
interface SignUpFormData{
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef =  useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    /* Lidar com o Submit do form */
    const handleSubmit = useCallback( async (data: SignUpFormData) =>  {
        try {
            formRef.current?.setErrors({});

            /* Criando um Schema de validação para um objeto usando a biblioteca YUP que foi importada */
            const schema =  Yup.object().shape({
                name: Yup.string().required('Nome é obrigatório'),
                email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required().min(6,'Deve ter no mínimo 6 dígitos'),
            });
            /* Utiliza o schema passado o data e para validar */
            await schema.validate(data,{
                abortEarly: false //Ao declarar a propriedade abortEarly como false o Yup ira apresentar todos os erros.
            });

            /* inserindo Dados de Cadastro de Usuários */
            await api.post('/users', data);

            history.push('/');

            addToast({
                type:'success' ,
                title:'Cadastro realizado!',
                description:'Já é possível fazer logon no GoBarber.',
            })

        } catch (err) {
            if(err instanceof Yup.ValidationError){
             const errors = getValidationErros(err);

             formRef.current?.setErrors(errors);

             return;
            }

            addToast({
                type: 'error',
                title: 'Erro no Cadastro!',
                description: 'Ocorreu um erro ao realizar o cadastro, tente novamente.'
            })
        }
    }, [addToast, history]);



    return(
    /* Conteiner é um type criando em nossa aplicação */
    <Container>
         <Background/>
        <Content>
            <AnimationContainer>
            <img src={logoImg} alt="GoBarber"/>

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu cadastro</h1>

                <Input name="name" icon={FiUser} placeholder="Nome" />

                <Input name="email" icon={FiMail} placeholder="E-mail" />

                <Input name="password" icon={FiLock} type="password"  placeholder="Senha" />

                <Button type="submit">Cadastrar</Button>

                </Form>
                <FiArrowLeft/>
                <Link to="/">Voltar para logon</Link>
            </AnimationContainer>
        </Content>


    </Container>
)};

export default SignUp;
