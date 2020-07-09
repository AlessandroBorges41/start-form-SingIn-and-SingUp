import styled, {css} from "styled-components";
import { animated } from "react-spring";

/* Cria uma inteface para definir a propriedade do Toast */
interface ConatinerProps {
    type?: 'success' | 'error' | 'info';
    hasDescription: boolean;
}

    /* Organizando um pouco o CSS no Style isolando alguma validações */
    const toastTypeVariations = {
        info: css`
            background: #ebf8ff;
            color: #3172b7;
        `,
        success:css`
            background: #e6fffa;
            color: #2e656a;
        `,
        error:css`
            background: #fddede;
            color: #c53030;
        `,
    };

    export const Container = styled(animated.div)<ConatinerProps>`
    width: 360px;

    position: relative;
    padding: 16px 30px 16px 16px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

    display: flex;

    /* Um Toast que antes dele tem um Toast recebe uma margin-top */
    & + div {
        margin-top: 8px;
    }

    /* Fazendo validações para definir o CSS que o Toast irá assumir */
    ${props => toastTypeVariations[props.type || 'info' ]}


    /* Customizar o Svg apenas que está no Toast  */
    > svg{
        margin: 4px 12px 0 0;
    }

    div{
        flex: 1;

        p {
            margin-top: 4px;
            font-size: 14px;
            opacity: 0.8;
            line-height: 20px;
        }
    }

    button{
        position: absolute;
        right: 16px;
        top: 19px;
        opacity: 0.6;
        border: 0;
        background: transparent;
        color: inherit;
    }


    ${props => !props.hasDescription && css`
        align-items: center;

        svg{
            margin-top: 0
        }

    `}

`;

