import React, { useState } from 'react';
import Card from '../components/card'
import FormGroup from "../components/form-group";
import axios from 'axios'

import { useNavigate } from 'react-router-dom';


function Login() {
    const [userData, setUserData] = useState({
        email: '',
        senha: '',
        mErro: null
    });

    const navegar = useNavigate();

    const entrar = () => {
        axios.post('http://localhost:8080/api/usuarios/autenticar', {
            email: userData.email,
            senha: userData.senha
        }
        )
        .then( response => {
            localStorage.setItem('_user_logado', JSON.stringify( response.data))

            navegar('/home')
        })
        .catch(err => {
            console.log(err.response)
            setUserData({mErro: err.response.data})
        })
    };

    return (
        <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
            <div className="bs-docs-section">
                <Card title="Login">
                    <div className='row'>
                        <span>{userData.mErro}</span>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <fieldset>
                                    <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            value={userData.email}
                                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                                            placeholder="Digite o Email"
                                        />
                                    </FormGroup>

                                    <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            value={userData.senha}
                                            onChange={e => setUserData({ ...userData, senha: e.target.value })}
                                            placeholder="Digite a Senha"
                                        />
                                    </FormGroup>

                                    <div className="espaco_button">
                                        <button onClick={entrar} className="btn btn-success">
                                            Entrar
                                        </button>
                                        <button
                                            onClick={() => navegar('/cadastro')}
                                            className="btn btn-danger">Cadastrar</button>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Login;