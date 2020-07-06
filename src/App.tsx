import React from 'react';

import SignIn from './pages/Signin/';
//import SignUp from './pages/SignUp/';
import GlolabStyled from './styles/global';

const  App: React.FC = () => (
  /* Inclui o fragement <> ,</> porque teremos mais de um componente Html  */
    <>
        <SignIn/>
        <GlolabStyled/>
    </>
);

export default App;
