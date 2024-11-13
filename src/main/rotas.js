import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "../views/login";
import Cadastro from "../views/cadastro";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos";

function Rotas(){
    return(
        
            <Router>
                <Routes>

                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/cadastro' element={<Cadastro />} />
                    <Route path='/consultaLancamentos' element={<ConsultaLancamentos />} />
                
                </Routes>
            </Router>
        
        


    )
}

export default Rotas