import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
    padding: 10px 100px;
    text-align: center;
    font: 16px  "fantasy";
    color:  red;
    bottom: 0;
    /* background-color: transparent; */
`;

function Component() {
    return (
        <Footer>
            请科学上网 如有问题 本网站概不负责
        </Footer>
    )
}
export default Component