import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import Uploader from '../components/Uploader'
import Tips from '../components/Tips'
import styled from 'styled-components'


const A = styled.a`
    color: #fff;
`

const Home = observer(() => {
    const { UserStore } = useStores()

    const User = () => <div> hello {UserStore.currentUser.attributes.username} </div>

    return (
        <>
            <Tips children> <A href="/login">请先登录再上传</A>  </Tips>

            <Uploader />
        </>
    )
})
export default Home
