import React, { createContext, useCallback, useContext, useState } from "react";
import { uuid } from "uuidv4";


import ToastContainer from '../components/ToastContainer';

/* A interface ToastMessage será utilizada para passar ao aplicativo um dos tipos de Toast, seu titulo e mensagem */
export interface ToastMessage {
    id: string;
    type?: 'success' | 'error' | 'info';
    title: string;
    description?: string;
};

interface ToastContextData {
    addToast(messages: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
};

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    /* Usando ao propriedade Omit do Javascript */
    const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
        const id = uuid();

        const toast = {
            id,
            type,
            title,
            description,
        };

        /* Será utilizado um Spread para percorre o array e incluir o Toast no final dele */
        setMessages((state) => [...messages, toast]);
    }, []);

    const removeToast = useCallback((id: string ) => {
        setMessages((state) => state.filter(message => message.id !== id));
    }, []);

    return(
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages}/>
        </ToastContext.Provider>
    );
};

function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if (!context){
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
}

export { ToastProvider, useToast };
