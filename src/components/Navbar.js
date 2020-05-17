import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Nav = styled.nav`
    height: 80px;
    padding: 15px 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: #191983;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    a{
        color: inherit;
        margin: 0 10px;
    }
`

export const Navbar = () => (
    <Nav>
        <h1>Weather Forecast</h1>
        <div>
            <Link to={`/`}>Home</Link>
            <Link to={`/favorites`}>Favorites</Link>
        </div>
    </Nav>
)