import { React, useState, useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '../../Context/Context';
import { Link } from 'react-router-dom';
import './Auth.css'

let baseUrl = '';
if (window.location.href.split(':')[0] === 'http') { baseUrl = 'http://localhost:5426' }

const Login = () => {
    let { state, dispatch } = useContext(GlobalContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            axios.post(`${baseUrl}/login`, {
                email: email,
                password: password
            }, {
                withCredentials: true
            })
            dispatch({ type: "LOGIN" })
            console.log("Login Successful")
        }
        catch (error) {
            console.log("error: ", error);
        }
    }
    return (
        <>
            <div id='form'>
                <form id="login-form" className="login-form" autoComplete="off" onSubmit={handleLogin}>
                    <h1 className="a11y-hidden">Login Form</h1>
                    <div>
                        <label className="label-email">
                            <input type="email" className="text" name="email" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} />
                            <span className="required">Email</span>
                        </label>
                    </div>
                    <input type="checkbox" name="show-password" className="show-password a11y-hidden" id="show-password" />
                    <label className="label-show-password" htmlFor="show-password">
                        <span>Show Password</span>
                    </label>
                    <div>
                        <label className="label-password">
                            <input type="text" className="text" name="password" placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }} />
                            <span className="required">Password</span>
                        </label>
                    </div>
                    <input type="submit" value="Log In" />
                    <div className="email">
                        {/* <a href=''>Forgot password?</a> */}
                        <button>Forgot password?</button>
                    </div>
                    <div className="email">
                        <Link to={`/signup`}>Don't have an account ?</Link>
                    </div>
                    <figure aria-hidden="true">
                        <div className="person-body"></div>
                        <div className="neck skin"></div>
                        <div className="head skin">
                            <div className="eyes"></div>
                            <div className="mouth"></div>
                        </div>
                        <div className="hair"></div>
                        <div className="ears"></div>
                        <div className="shirt-1"></div>
                        <div className="shirt-2"></div>
                    </figure>
                </form>
            </div>
        </>
    )
}

export default Login