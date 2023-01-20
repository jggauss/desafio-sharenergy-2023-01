import './EsqueceuSenha.css'
import { useState, useTransition } from 'react'
import Botao from '../../Components/Botao'
import Menu from '../../Components/Menu'
import api from '../../Config/ConfigApi'
import MensagemErro from '../../Components/MensagemErro'

import Cabecalho from '../../Components/Cabecalho'
import { Link } from 'react-router-dom'
import * as yup from 'yup';


const EsqueceuSenha = (props) => {
    const [email,setEmail] = useState('')
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    async function mensagem(e){
        e.preventDefault()
        setStatus({
            type:'success',
            message:"Página de demonstração. Não foi implementada."

        })
    }

    return (
        <div>
            <Cabecalho />
            <Menu />
            <h1 className='titulo-pagina'>Recuperar senha</h1>
            <div className='titulo'>
                <MensagemErro tipo={status.type} message={status.message} />
            </div>
            
            <form onSubmit={mensagem}>
                <div className='form-cliente-esqueceu'>
                    
                    <div className='campo-form-cliente-esqueceu'>
                        <label className='titulo-esqueceu'>Escreva o E-mail cadastrado</label>
                        <input
                            value={email}
                            className='titulo-esqueceu'
                            type="text"
                            placeholder='Digite o email cadastrado para recuperar a senha'
                            onChange={(evento => setEmail(evento.target.value))} />

                    </div>
                   



                    
                    </div>
                    <div className='rodape'>
                        <div className='separa-rodape'>
                            <Botao>
                                Enviar
                            </Botao>
                        </div>
                        <div className='separa-rodape'>
                            <Botao>
                                <Link className='rodape-voltar' to="/">Voltar</Link>
                            </Botao>

                        </div>
                    </div>
                
            </form>
        </div >
    )
}
export default EsqueceuSenha