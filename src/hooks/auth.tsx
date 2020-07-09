import React, { createContext, useCallback, useState, useContext } from "react";
//import SignIn from "../pages/SignIn";
import api from "../services/api";

/* Interface para uso na tipagen do estado */
interface AuthState {
    token: string;
    user: object;
};

interface SingInCredentials {
    email: string;
    password: string;
};

interface AuthContextData{
    user: object;
    signIn(credentials: SingInCredentials): Promise<void>;
    signOut(): void;
};

/* A criação dessa variavel authContext e útil pois utilizaremos seus dados para toda a aplicação. */
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

/*
    Esse parte do código é executada quando o usuário da um refresh na página ou quando e necessário obter
    os dadoa armazenados no localStorage
*/
const AuthProvider: React.FC = ({ children }) => {
    /* Criando um estado para conter os dados do token e usuário para ser utilizado pela aplicação */
    const [data, setData] = useState<AuthState>(() => {
        /* Obtendo os dados do localStorage */
        const token = localStorage.getItem('@GoBarber:token');
        const user  = localStorage.getItem('@GoBarber:user');

        /* Verifica a existencia de token e user na obtenção acima se positivo retorna as informações  */
        if(token && user){
            return { token, user: JSON.parse(user) }; //Transforma o valor String do user em um objeto JSON
        }
        return {} as AuthState;
    });

    /* Fazendo Login na Aplicação */
    const signIn = useCallback( async({ email, password }) => {
        /*
            Realizando o uso do backend para levantar uma session por meio do api.post('sessions'), mas é
            necessário passar o email, password
        */
        const response = await api.post('sessions', {
            email,
            password
        });

        /* Obtendo o Token do Usuário */
        const { token, user } = response.data;

        /* Armazenando os dados do token no localStorage, observação: como o user é um objeto fizemos uso do JSON
           e sua função stringify para converter o dado em string para ser armazenado no localStorage */
        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({ token, user })
    }, []);

    /* Fazendo Logout da Aplicação */
    const signOut = useCallback(() => {
        /* Apagando os dados no localStore referente ao login  */
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');

        /*colocando como vazio os dados para refletir que não a uma session criada */
        setData({} as AuthState);
    },[]);


    return(
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </ AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    /* Verifica se o context foi criado, caso negativo gera um erro */
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuth };

