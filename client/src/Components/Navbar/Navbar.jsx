import { React, useContext } from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import { GlobalContext } from '../../Context/Context';
import axios from 'axios'
import './Navbar.css'
import Home from '../Home'
import About from '../About'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import Products from '../Products'

let baseUrl = '';
if (window.location.href.split(':')[0] === 'http') { baseUrl = 'http://localhost:5426' }

const Navbar = () => {

    let { state, dispatch } = useContext(GlobalContext);

    const handleLogout = async () => {
        try {
            await axios.post(`${baseUrl}/logout`, {
                withCredentials: true
            })
            dispatch({ type: "LOGOUT" })
            console.log("Logout Successful")
        }
        catch (error) {
            console.log("error: ", error);
        }
    }


    return (
        <>
            {(state.isLogin === true) ?
                <nav>
                    <ul>
                        <li><Link to={`/`}>Home</Link></li>
                        <li><Link to={`/about`}>About</Link></li>
                        <li><Link to={`/product`}>Product</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
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