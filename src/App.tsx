import React from 'react';

import SignIn from './pages/Signin/';
//import SignUp from './pages/SignUp/';
import GlolabStyled from './styles/global';

import { AuthProvider } from './hooks/AuthContext';


const  App: React.FC = () => (
  /* Inclui o fragement <> ,</> porque teremos mais de um componente Html  */
    <>
        <AuthProvider>
            <SignIn/>
        </AuthProvider>
        <GlolabStyled/>
    </>
);

export default App;
