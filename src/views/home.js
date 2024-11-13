import React, { useEffect, useState } from "react";
import axios from "axios";


function Home() {

    const [userData, setUserData] = useState({
        saldo : 0,

    });
    

   useEffect(() => {
    const userLogado = localStorage.getItem('_user_logado');
    if (userLogado) {
        try {
            const userLogadoObj = JSON.parse(userLogado);

            
            if (userLogadoObj && userLogadoObj.id) {
                axios.get(`http://localhost:8080/api/usuarios/${userLogadoObj.id}/saldo`)
                    .then(response => {
                        if (response && response.data !== undefined) {
                            setUserData({ saldo: response.data });
                        } else {
                            console.log("Resposta da API não contém dados esperados.");
                        }
                    })
                    .catch(err => {
                        console.error("Erro ao buscar saldo:", err.response ? err.response.data : err.message);
                    });
            } else {
                console.log("Usuário logado não possui um ID.");
            }
        } catch (e) {
            console.error("Erro ao parsear o objeto de usuário logado:", e);
        }
    } else {
        console.log("Nenhum usuário logado encontrado no localStorage.");
    }

   }, [])
    

   

    
    

        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {userData.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="/cadastro" role="button"><i className="fa fa-users"></i>  Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg" href="/consultaLancamentos" role="button"><i className="fa fa-users"></i>  Consultar Lançamento</a>
                </p>
            </div>
        )
    
    }
    


export default Home