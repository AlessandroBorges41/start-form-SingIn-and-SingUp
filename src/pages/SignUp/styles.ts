import styled from 'styled-components';
import { shade } from 'polished';


import signUpBackgroundImg from '../../assets/sign-up-background.png';

/* Aquivo destinado ao CSS do Login ou SingIn da Aplicação WEB  */

export const Container = styled.div`
/* vh  View High usado sempre para que o componente assuma o tamanho da tela */
    height: 100vh;
    /* Coloca um elemento do lado do outro */
    display: flex;
    /* o conteúdo dentro do container possui 100 do tamanho devido a inclusão do stretch, assim
    tanto o Content como o Background terá o tamanho como o Container */
    align-items: stretch;

`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    /* Centraliza os elementos  */
    place-content: center;

    width: 100%;
    max-width: 700px;

    form{
        margin: 80px 0;
        width: 340px;
        text-align: center;
    }

    h1{
        margin-bottom: 24px;
    }

        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover{
                color: ${shade(0.2,'#F4EDE8')};
            }
        }
    }

    /* Para que exista uma estilização diferente a um elemento que já foi estilizado e para não comprometer esse estilo
       incluimos ao lado esquedo do elemento um sinal de maior >, veja abaixo:
    */
    > a {
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            display: flex;
            align-items: center;

            svg{
                margin-right:16px;
            }

            &:hover{
                color: ${shade(0.2,'#F4EDE8')};
            }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signUpBackgroundImg}) no-repeat center;
    /* Para cobrio o tamanho da div que ele está */
    background-size: cover;
`;
