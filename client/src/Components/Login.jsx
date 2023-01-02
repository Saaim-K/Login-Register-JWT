import { React, useState } from 'react'
import axios from 'axios'

let baseUrl = '';
if (window.location.href.split(':')[0] === 'http') { baseUrl = 'http://localhost:5426' }

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            axios.post(`${baseUrl}/login`, {
                email: email,
                password: password
            }, {
                withCredentials: true
            })
            console.log("Login Successful")
        }
        catch (error) {
            console.log("error: ", error);
        }
    }
    return (
        <>
            <h1>Login Form</h1>
            <form onSubmit={loginHandler}>
                Email : <input type="text" name='email' onChange={(e) => { setEmail(e.target.value) }} /> <br />
                Password : <input type="password" name='password' onChange={(e) => { setPassword(e.target.value) }} /> <br />
                <button type='submit'>Login</button>
            </form>
            <h1>{email}</h1>
            <h1>{password}</h1>
        </>
    )
}

export default Login