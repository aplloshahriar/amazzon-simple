import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='header'>
           <img src={logo} />
           <div>
            <Link to="/">shop</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/inventory">inventory</Link>
            <Link to="/login">login</Link>
           </div>
            
        </nav>
    );
};

export default Header;