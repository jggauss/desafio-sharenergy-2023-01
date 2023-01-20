import './ConsultaCliente.css'
import Menu from '../../Components/Menu'
import Cabecalho from '../../Components/Cabecalho'
import { useEffect, useState } from 'react'
import api from '../../Config/ConfigApi'
import { Link, useParams } from 'react-router-dom'
import Botao from '../../Components/Botao'


const ConsultaCliente = () => {
    const { _id } = useParams()
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })


    const GetCliente = async () => {
        const valueToken = localStorage.getItem("token")

        const headers = {
            'headers': {
                'Authorization': "Bearer " + valueToken
            }
        }
        await api.get('/cliente/' + _id, headers)
            .then((response) => {

                setData(response.data)
            })
            .catch((erro) => {
                setStatus({
                    type: 'error',
                    message: erro.response.data.message
                })
            })
    }

    useEffect(() => {
        GetCliente()
    }, []
    )


    return (
        <div className='tela'>
            <Cabecalho />
            <Menu />
            <div className='centraliza-box-consulta'>


                <div className='tabela-consulta'>
                    <h1>Consulta Cliente</h1>
                    <div className='linha-consulta'>
                        <div className='cor-campo-consulta'>
                            <div className='campo-consulta'>Nome :</div>
                        </div>

                        <div className='valor-consulta'>{data.nome}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo-consulta'>
                            <div className='campo-consulta'>E-mail :</div>
                        </div>
                        <div className='valor-consulta'>{data.email}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo-consulta'>
                            <div className='campo-consulta'>Telefone : </div>
                        </div>
                        <div className='valor-consulta'>{data.telefone}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo-consulta'>
                            <div className='campo-consulta'>cpf : </div>
                        </div>
                        <div className='valor-consulta'>{data.cpf}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo-consulta'>
                            <div className='campo-consulta'>Rua : </div>
                        </div>
                        <div className='valor-consulta'>{data.rua}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo-consulta'>
                            <div className='campo-consulta'>Número : </div>
                        </div>
                        <div className='valor-consulta'>{data.numero}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo-consulta'>
                            <div className='campo-consulta'>Bairro : </div>
                        </div>
                        <div className='valor-consulta'>{data.bairro}</div>

                    </div>
                    <div className='linha-consulta'>
                        <div className='cor-campo-consulta'>
                            <div className='campo-consulta'>Cidade : </div>
                        </div>
                        <div className='valor-consulta'>{data.cidade}</div>

                    </div>

                    <div className='linha-consulta'>
                        <div className='cor-campo-consulta'>
                            <div className='campo-consulta'>CEP : </div>
                        </div>
                        <div className='valor-consulta'>{data.cep}</div>
                    </div>

                    <div className='linha-consulta'>
                        <div className='cor-campo-consulta'>
                            <div className='campo-consulta'>Estado : </div>
                        </div>
                        <div className='valor-consulta'>{data.estado}</div>

                    </div>
                    <div className='rodape-consulta'>
                        <Botao>
                            <div className='btn-cons'>
                                <Link className='inclui-cliente-consulta' to="/clientes">Voltar</Link>
                            </div>
                            
                        </Botao>

                    </div>

                </div>
            </div>
        </div>

    )
}
export default ConsultaCliente