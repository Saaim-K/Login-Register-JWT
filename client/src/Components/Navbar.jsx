import { React, useState } from 'react'
import { BrowserRouter as Router, Link, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Login from './Login'
import Signup from './Signup'

const Navbar = () => {
    const [isLogin, setisLogin] = useState(false)
    return (
        <>
            <Router>
                {(isLogin === true) ?
                    <>
                        <h1> <Link to={`/`}>Home</Link> </h1>
                        <h1> <Link to={`/about`}>About</Link> </h1>
                    </>
                    : <>
                        <h1> <Link to={`/`}>Login</Link> </h1>
                        <h1> <Link to={`/signup`}>Signup</Link> </h1>
                    </>
                }
                {(isLogin === true) ?
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="*" element={<Navigate to="/" replace={true} />} />
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="*" element={<Navigate to="/" replace={true} />} />
                    </Routes>
                }
            </Router>

        </>
    )
}

export default Navbar