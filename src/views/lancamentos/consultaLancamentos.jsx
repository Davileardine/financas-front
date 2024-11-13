import React, {useState, useEffect} from "react";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectComponent from "../../components/select";
import LancamentosTable from "./lancamentosTable";
import axios from "axios";

function ConsultaLancamentos(){

    const [lancamentoData, setLancamentoData] = useState({
        ano: '',
        mes: '',
        tipo: '',
        usuario: ''

    });

    const [lancamentos, setLancamento] = useState([])

    useEffect(() => {
        const userLogado = localStorage.getItem('_user_logado');
        if (userLogado) {
            const userLogadoObj = JSON.parse(userLogado);
            setLancamentoData(prevData => ({
                ...prevData,
                usuario: userLogadoObj.id
            }));
        }
    }, []);

           
 


    const consulta = () => {
        const params = `?ano=${lancamentoData.ano}&mes=${lancamentoData.mes}&tipo=${lancamentoData.tipo}&usuario=${lancamentoData.usuario}`;
        axios.get(`http://localhost:8080/api/lancamentos${params}`)
            .then(response => {
                console.log(response.data);
                setLancamento(response.data)
                
                
            })
            .catch(err => {
                console.error(err);
            });
    }



    const lista = [
        {label: 'Selecione ...', value: ''},
        {label: 'Janeiro', value: '1'},
        {label: 'Fevereiro', value: '2'},
        {label: 'Março', value: '3'},
        {label: 'Abril', value: '4'},
        {label: 'Maio', value: '5'},
        {label: 'Junho', value: '6'},
        {label: 'Julho', value: '7'},
        {label: 'Agosto', value: '8'},
        {label: 'Setembro', value: '9'},
        {label: 'Outubro', value: '10'},
        {label: 'Novembro', value: '11'},
        {label: 'Dezembro', value: '12'}
    ]
    
    const tipos = [
        {label: 'Selecione ...', value: ''},
        {label: 'Despesa', value: 'DESPESA'},
        {label: 'Receita', value: 'RECEITA'}
    ]

    // const lancamentos = [
    //     {descricao: 'Salario', valor: 5000, mes: 1, tipo: 'Receita', status: 'Efetivado'}
    // ]

    return (
        <Card title="Consulta Lançamentos">
            <div className="row">
                <div className="col-md-6">
                    <div className="bs-component">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text" className="form-control" id="inputAno" placeholder="Digite o Ano"
                                value={lancamentoData.ano} onChange={e => setLancamentoData({...lancamentoData, ano: e.target.value})} />
                        </FormGroup>

                        <FormGroup htmlFor="inputMes" label="Mês: ">
                            <SelectComponent className="form-control" lista={lista} 
                                value={lancamentoData.mes} onChange={e => setLancamentoData({...lancamentoData, mes: e.target.value})} />
                        </FormGroup>

                        <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: ">
                            <SelectComponent className="form-control" lista={tipos} 
                                value={lancamentoData.tipo} onChange={e => setLancamentoData({...lancamentoData, tipo: e.target.value})} />
                        </FormGroup>

                        <button type="button" className="btn btn-success" onClick={consulta}>Buscar</button>
                        <button type="button" className="btn btn-danger">Cadastrar</button>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-12">
                    <div className="bs-component">
                        {lancamentos &&<LancamentosTable lancamentos={lancamentos} />}
                    </div>
                </div>
            </div>
        </Card>
    );

}

export default ConsultaLancamentos