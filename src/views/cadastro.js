import React, {useState}from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Cadastro() {

    const [userData, setUserData] = useState({
        nome: '',
        email: '',
        senha: '',
        senha2: '',
        cErro: null,
        emailErro: null

    });

    const navegar = useNavigate()

    const cadastrar = () => {
        axios.post('http://localhost:8080/api/usuarios/cadastrar', {
            nome: userData.nome,
            email: userData.email,
            senha: userData.senha
        }
        )
        .then( response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err.response)
            setUserData({cErro: err.response.data})
        })
    };

    const handleSalvar = () => {
        cadastrar();
        navegar('/login');
    };

    const validarEmail = (email) => {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setUserData({ ...userData, email });

        if (!validarEmail(email)) {
            setUserData({ ...userData, email, emailErro: 'Email inválido' });
        } else {
            setUserData({ ...userData, email, emailErro: null });
        }
    };


    return (

        <Card title='Cadastro de Usuários'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <fieldset>
                            <FormGroup label="Nome: *" htmlFor="InputName">
                                <input type="email" className="form-control" id="InputName"
                                    aria-describedby="emailHelp"
                                    value={userData.nome} onChange={e => setUserData({ ...userData, nome: e.target.value })}
                                    placeholder="Digite o Nome" />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="InputEmail">
                                <input type="email" className="form-control" id="InputEmail"
                                    aria-describedby="emailHelp"
                                    value={userData.email} onChange={handleEmailChange}
                                    placeholder="Digite o Email" />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="InputPassword">
                                <input type="password" className="form-control" id="InputPassword"
                                    value={userData.senha} onChange={e => setUserData({ ...userData, senha: e.target.value })}
                                    placeholder="Digite a Senha" />
                            </FormGroup>
                            <FormGroup label="Repita a senha: *" htmlFor="InputPasswordRepetida">
                                <input type="password" className="form-control" id="InputPasswordRepetida"
                                    value={userData.senha2} onChange={e => setUserData({ ...userData, senha2: e.target.value })}
                                    placeholder="Digite a Senha" />
                            </FormGroup>
                            <div className="espaco_button">
                                <button onClick={handleSalvar} className="btn btn-success">Salvar</button>
                                <button onClick={() => navegar('/login')} className="btn btn-danger">Cadastrar</button>
                            </div>


                        </fieldset>
                    </div>

                </div>

            </div>
        </Card>
    )
}

export default Cadastro