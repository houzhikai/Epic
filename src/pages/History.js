import React from 'react'
import List from '../components/List'
import styled from 'styled-components'

const H1 = styled.h1`
    border-bottom: 2px solid #000;
    padding: 20px 0;
`

function History() {
    return (
        <>
            <H1>上传历史记录</H1>
            <List />
        </>
    )
}
export default History