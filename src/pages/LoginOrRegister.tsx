import React from 'react'
import styled from 'styled-components';
import Login from './Login';
import SignUp from './SignUp';

type typeProps = {
    isLogin: boolean
}

function LoginOrRegister({isLogin}: typeProps) {
  return (
    <Container>
        <AuthForm>
            {isLogin ? <Login/> : <SignUp/>}
        </AuthForm>
    </Container>
  )
}

const Container = styled.div`
    background-color: #dcdefe;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const AuthForm = styled.div`
    background-color: white;
    width: 80vw;
    height: 80vh;
`

export default LoginOrRegister
