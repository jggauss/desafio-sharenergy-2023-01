import './IncluiUser.css'
import { useState } from 'react'
import Botao from '../../Components/Botao'
import Menu from '../../Components/Menu'
import api from '../../Config/ConfigApi'
import MensagemErro from '../../Components/MensagemErro'

import Cabecalho from '../../Components/Cabecalho'
import { Link } from 'react-router-dom'
import * as yup from 'yup';



const IncluiUser = (props) => {

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })


    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [password, setPassword] = useState('')


    async function salvar(evento) {
        evento.preventDefault()
        setNome(nome)
        setEmail(email.toLocaleLowerCase())
        setUserName(userName)
        setDataNascimento(dataNascimento)
        setPassword(password)

        const dados = {
            nome,
            email,
            userName,
            dataNascimento,
            password: password,
            foto: "https://randomuser.me/api/portraits/med/women/53.jpg"

        }
        
        if (!(await validarUsuario())) return
        const valueToken = localStorage.getItem("token")

        const headers = {
            'headers': {
                'Authorization': "Bearer " + valueToken
            }
        }
        await api.post('/user', dados, headers)
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message
                })
                setNome("")
                setEmail("")
                setUserName("")
                setDataNascimento("")

            })
            .catch((erro) => {
                setStatus({
                    type: 'error',
                    message: erro.response.data.message
                })
            })
    }
    async function validarUsuario() {
        let schema = yup.object().shape({

            //dataNascimento: yup.string("Digite uma data váida").required("Digite uma data váida").max(moment(new Date()).format("DD/MM/YYYY")),
            password: yup.string("A senha deve ter pelo menos 6 caracteres").required("A senha deve ter pelo menos 6 caracteres").min(6),
            userName: yup.string("Username deve ter 4 números").required("Username deve ter 4 números").min(4),
            email: yup.string("Deve ser digitado um email").required("Deve ser digitado um email").email(),
            nome: yup.string("O nome deve ter pelo menos 4 caracteres").required("O nome deve ter pelo menos 4 caracteres").min(4),
        })

        try {
            await schema.validate({
                nome: nome,
                email: email,
                userName: userName,
                password: password,
                //dataNascimento: dataNascimento


            })
            return true
        } catch (err) {
            setStatus({
                type: "error",
                message: err.errors,
            });
            return false
        }

    }

    return (
        <div>
            <Cabecalho />
            <Menu />
            <div className='mensagem-erro-inclui-user'>
                <h1 className='titulo-pagina-user'>Cadastrar usuário</h1>
            </div>
            
            <div classname="mensagem-erro-inclui-user">
                <MensagemErro tipo={status.type} message={status.message} />
            </div>
            
            <form onSubmit={salvar}>
                <div className='form-user'>
                    <div className='campo-form-user'>
                        <div className='campo-user'>
                            <label className='titulo-user'>Nome</label>
                        </div>

                        <input
                            value={nome}
                            className='titulo-user-input'
                            type="text"
                            placeholder='Digite o nome do user'
                            onChange={(evento) => setNome(evento.target.value)}
                            autoFocus />

                    </div>
                    <div className='campo-form-user'>
                        <div className='campo-user'>
                            <label className='titulo-user'>E-mail</label>
                        </div>
                        <input
                            value={email}
                            className='titulo-user-input'
                            type="text"
                            placeholder='Digite o melhor email do user'
                            onChange={(evento => setEmail(evento.target.value))} />

                    </div>
                    <div className='campo-form-user'>
                        <div className='campo-user'>
                            <label className='titulo-user'>UserName</label>
                        </div>
                        <input
                            value={userName}
                            className='titulo-user-input'
                            type="text"
                            placeholder='Digite o username do user'
                            onChange={(evento) => setUserName(evento.target.value)}
                            autoFocus />

                    </div>
                    <div className='campo-form-user'>
                        <div className='campo-user'>
                            <label className='titulo-user'>Senha</label>

                        </div><input
                            value={password}
                            className='titulo-user-input'
                            type="password"
                            placeholder='Digite o username do user'
                            onChange={(evento) => setPassword(evento.target.value)}
                            autoFocus />

                    </div>
                    <div className='campo-form-user'>
                        <div className='campo-user'>
                            <label className='titulo-user'>Data de nascimento</label>
                        </div>
                        <input
                            value={dataNascimento}
                            className='titulo-user-input'
                            type="date"
                            placeholder='Digite o username do user'
                            onChange={(evento) => setDataNascimento(evento.target.value)}
                            autoFocus />

                    </div>




                    
                    </div>
                    <div className='rodape-user'>
                        <div className='separa-rodape-user'>
                            <Botao>Cadastrar</Botao>
                        </div>
                        <div className='separa-rodape-user'>
                            <Botao>
                                <Link className='rodape-voltar' to="/">Voltar</Link>
                            </Botao>

                        </div>
                    </div>
                
            </form>
        </div >
    )
}
export default IncluiUser