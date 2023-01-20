import './ExcluiCliente.css'
import Menu from '../../Components/Menu'
import Cabecalho from '../../Components/Cabecalho'
import { useEffect, useState } from 'react'
import api from '../../Config/ConfigApi'
import { Link, Navigate, useParams } from 'react-router-dom'
import Botao from '../../Components/Botao'


const ExcluiCliente = () => {
    const { _id } = useParams()
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    console.log(_id)

    const GetCliente = async () => {
        const valueToken = localStorage.getItem("token")

        const headers = {
            'headers': {
                'Authorization': "Bearer " + valueToken
            }
        }
        await api.get('/cliente/' + _id,headers)
            
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
    async function deletaCliente(_id) {
        const valueToken = localStorage.getItem("token")

        const headers = {
            'headers': {
                'Authorization': "Bearer " + valueToken
            }
        }

        await api.delete('/cliente/' + _id,headers)
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message
                })
                setData(response.data)
            })
            .catch((erro) => {
                setStatus({
                    type: 'error',
                    message: erro.response.data.message
                })
            })

    }

    return (
        <div className='tela'>
            <Cabecalho />
            <Menu />
            <div className='centraliza-box-exclui'>


                <div className='tabela-exclui'>
                    <h1>Exclui Cliente</h1>
                    <div className='linha-exclui'>
                        <div className='cor-campo-exclui'>
                            <div className='campo-exclui'>Nome :</div>
                        </div>

                        <div className='valor-exclui'>{data.nome}</div>

                    </div>
                    <div className='linha-exclui'>
                        <div className='cor-campo-exclui'>
                            <div className='campo-exclui'>E-mail :</div>
                        </div>
                        <div className='valor-exclui'>{data.email}</div>

                    </div>
                    <div className='linha-exclui'>
                        <div className='cor-campo-exclui'>
                            <div className='campo-exclui'>Telefone : </div>
                        </div>
                        <div className='valor-exclui'>{data.telefone}</div>

                    </div>
                    <div className='linha-exclui'>
                        <div className='cor-campo-exclui'>
                            <div className='campo-exclui'>cpf : </div>
                        </div>
                        <div className='valor-exclui'>{data.cpf}</div>

                    </div>
                    <div className='linha-exclui'>
                        <div className='cor-campo-exclui'>
                            <div className='campo-exclui'>Rua : </div>
                        </div>
                        <div className='valor-exclui'>{data.rua}</div>

                    </div>
                    <div className='linha-exclui'>
                        <div className='cor-campo-exclui'>
                            <div className='campo-exclui'>Número : </div>
                        </div>
                        <div className='valor-exclui'>{data.numero}</div>

                    </div>
                    <div className='linha-exclui'>
                        <div className='cor-campo-exclui'>
                            <div className='campo-exclui'>Bairro : </div>
                        </div>
                        <div className='valor-exclui'>{data.bairro}</div>

                    </div>
                    <div className='linha-exclui'>
                        <div className='cor-campo-exclui'>
                            <div className='campo-exclui'>Cidade : </div>
                        </div>
                        <div className='valor-exclui'>{data.cidade}</div>

                    </div>

                    <div className='linha-exclui'>
                        <div className='cor-campo-exclui'>
                            <div className='campo-exclui'>CEP : </div>
                        </div>
                        <div className='valor-exclui'>{data.cep}</div>
                    </div>

                    <div className='linha-exclui'>
                        <div className='cor-campo-exclui'>
                            <div className='campo-exclui'>Estado : </div>
                        </div>
                        <div className='valor-exclui'>{data.estado}</div>

                    </div>
                    <div className='confirma-exclusao'>

                        <Botao>
                            <Link className='exclui-cliente' to="#" onClick={() => deletaCliente(_id)}>Exclusão</Link>
                        </Botao>
                        <Botao>
                            <Link className='exclui-cliente' to="/clientes">Cancela</Link>
                        </Botao>



                        {status.type === "success" ? (<Navigate to="/clientes" state={status} />) : ("")}
                    </div>
                </div>

            </div>
        </div>

    )
}
export default ExcluiCliente