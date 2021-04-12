import React from 'react'
import { useStores } from '../stores'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const Tips = styled.div`
    background: red;
    padding: 10px; 
    margin: 30px 0;
    color: #fff;
    border-radius: 4px;
    text-align: center;
`
const H1 = styled.h1`
    background: green;
    font-size: 16px;
    padding: 10px; 
    margin: 30px 0;
    color: #fff;
    border-radius: 4px;
    text-align: center;
`
const Component = observer(({children}) => {

    const { UserStore } = useStores()

    return(
        <>
            {
                UserStore.currentUser ? <H1>登录成功，可以上传图片啦</H1> : <Tips>{children}</Tips>
            }  

        </>
    )
})

export default Component