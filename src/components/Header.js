import React, { useState, useEffect } from 'react'
import LogoUrl from './logo.png'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'antd'
import { useStores } from '../stores'
import { observer } from 'mobx-react'


const Header = styled.header`
    display: flex;
    align-items: center;
    padding: 20px 100px;
    background-color: transparent;
    color: #fff;
`;
const Logo = styled.img`
    height: 30px;
    border-radius: 50%;
`;
//      这里的Link 是传递的参数，不是在前面加了个 .
const StyledLink = styled(NavLink)`
    color: #fff;
    margin-left: 30px;

    &.active {
        border-bottom: 1px solid #fff;
    }
`;
const Login = styled.div`
    margin-left: auto;
    text-decoration: none;
    color: #fff;
`;

const StyledButton = styled(Button)`
    margin-left: 10px; 
`


//    observer 实时监控数据的变动
const Component = observer(() => {

    const history = useHistory()
    const { UserStore, AuthStore } = useStores()
    const handleLogout = () => {
        AuthStore.logout()
    }
    const handleLogin = () => {
        //跳转到登录页面
        history.push('/login')
    }
    const handleRegister = () => {
        //跳转到注册页面
        history.push('/register')
    }

    useEffect(()=>{
        UserStore.pullUser()
  },[])

    return (
        <Header>
            <Logo src={LogoUrl} />
            <nav>
                <StyledLink to='/' exact activeClassName='active'>首页</StyledLink>
                <StyledLink to='/history' activeClassName='active'>历史</StyledLink>
                <StyledLink to='/about' activeClassName='active'>关于</StyledLink>
            </nav>
            <Login>
                {
                    UserStore.currentUser ? 
                    <>
                        {UserStore.currentUser.attributes.username} <StyledButton type="primary" onClick={handleLogout}>注销</StyledButton>
                    </> :
                    <>
                    <StyledButton type="primary" onClick={handleLogin}>登录</StyledButton>
                    <StyledButton type="primary" onClick={handleRegister}>注册</StyledButton>
                    </>
                }               
            </Login>
        </Header>
    )
})
export default Component