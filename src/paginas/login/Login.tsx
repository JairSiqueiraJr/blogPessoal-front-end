import React, {useState, useEffect, ChangeEvent} from 'react';
import {Grid, Typography, TextField, Button} from '@material-ui/core';
import {Link, useNavigate} from 'react-router-dom';
import {login} from '../../services/Service';
import UserLogin from '../../models/UserLogin';
import {Box} from '@mui/material';
import { useDispatch} from 'react-redux';
import {addToken} from "../../store/tokens/actions"


import'./Login.css';
import {error} from 'console';
import { toast } from 'react-toastify';

function Login() {

    let history = useNavigate(); 

    const dispatch = useDispatch(); 
    const[token, setToken]= useState('');
    const[userLogin, setUserLogin]= useState<UserLogin>({

        id: 0,
        usuario: '',
        senha: '',
        token: ''
    })

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=> {
        if(token != ''){
            dispatch(addToken(token))
            history('/home')
        }
        }, [token])

    async function onSubmit (e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        try{
            await login (`/usuarios/logar`, userLogin, setToken)
            toast.success('Usuario logado com sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
              });
            //alert('Usuário logado com sucesso!"');

        }catch(error){
            toast.error('Dados do usuário inconsistentes. Erro ao logar!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
              });
            //alert('Dados do usuário inconsistentes. Erro ao logar!')
        }

    }

    return(
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form onSubmit ={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' align='center' className="textos1"> Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='Usuário' variant='outlined' name='usuario' margin='normal' fullWidth></TextField>
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password'fullWidth></TextField>
                        <Box marginTop={2} textAlign='center'>
                                <Button type='submit' variant='contained' color='primary'>
                                    Logar
                                </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastroUsuario'> 
                            <Typography variant='subtitle1' gutterBottom align='center' className="textos1"> Cadastre-se!
                        </Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className="imagem">
            </Grid>
        </Grid>
    )
}

export default Login;