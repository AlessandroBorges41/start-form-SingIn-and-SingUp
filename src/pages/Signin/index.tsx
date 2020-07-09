import React, { useRef, useCallback } from 'react';

import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from 'yup';

import { Link, useHistory } from "react-router-dom";

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import  getValidationErros from "../../utils/getValidationErrors";

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

/* Interface a ser usada para tipar os dados enviado para autenticação */
interface SignInFormData {
    email: string,
    password: string,
}

const SignIn: React.FC = () => {
    const formRef =  useRef<FormHandles>(null);


    /* const { user, signIn } = useContext(AuthContext); */
    /* Trabalhando com Hook (ganços) */
    /* const { user, signIn } = useAuth(); */

    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    //console.log(user);

    /* Lidar com o Submit do form */
    const handleSubmit = useCallback( async (data: SignInFormData) =>  {
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
            await signIn({
                email: data.email,
                password: data.password
            });

            history.push('/dashboard');

        } catch (err) {
            console.log(err);
            /* Verificando se o erro gerado é uma instaância do YUP */
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErros(err);

                formRef.current?.setErrors(errors);
                return;
            }


            /* Caso o erro não seja uma instância do YUP, será utilizado o disparo de um TOAST
               que é um componente criado no aplicativo
            */
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, verifique as credenciais',
            });
        }
    },
     [signIn, addToast, history],
    );

    return(
    /* Conteiner é um type criando em nossa aplicação */
    <Container>
        <Content>
            <AnimationContainer>
                <img src={logoImg} alt="GoBarber"/>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input name="password" icon={FiLock} type="password"  placeholder="Senha" />

                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>

                </Form>
                <FiLogIn/>
                <Link to="/signup">Criar Conta</Link>
            </AnimationContainer>
        </Content>

        <Background/>
    </Container>
)};

export default SignIn;
