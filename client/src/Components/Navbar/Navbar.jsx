import { React, useContext } from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import { GlobalContext } from '../../Context/Context';
import './Navbar.css'
import Home from '../Home'
import About from '../About'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import Products from '../Products'

const Navbar = () => {

    let { state, dispatch } = useContext(GlobalContext);

    return (
        <>
            {(state.isLogin === true) ?
                <nav>
                    <ul>
                        <li><Link to={`/`}>Home</Link></li>
                        <li><Link to={`/about`}>About</Link></li>
                        <li><Link to={`/product`}>Product</Link></li>
                    </ul>
                </nav>
                :
                <nav>
                    <ul>
                        <li><Link to={`/`}>Login</Link></li>
                        <li><Link to={`/signup`}>Signup</Link></li>
                    </ul>
                </nav>
            }
            {(state.isLogin === true) ?
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="product" element={<Products />} />
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
                :
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
            }
        </>
    )
}

export default Navbar