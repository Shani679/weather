import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    background-color: #fdeaea;
    color: #d42525;
    padding: 15px 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 330px;
    margin: 15px auto 0;
    justify-content: center;
    border-radius: 4px;
    box-sizing: border-box;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
`

export const Tooltip = () => (
    <Container>
        Someting went wrong... please try again later
    </Container>
)