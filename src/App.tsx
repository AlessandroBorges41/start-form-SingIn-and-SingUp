import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";


import GlolabStyled from './styles/global';

//import ToastContainer from "./components/ToastContainer";

import AppProvider from './hooks';

import Routes from './routes';


const  App: React.FC = () => (
  /* Inclui o fragement <> ,</> porque teremos mais de um componente Html  */
  <Router>
        <AppProvider>
                <Routes/>
        </AppProvider>

        <GlolabStyled/>
  </Router>
);

export default App;
