import { useState } from 'react'
import axios from 'axios'

let baseUrl = '';
if (window.location.href.split(':')[0] === 'http') { baseUrl = 'http://localhost:5426' }

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const handleSignin = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}/signup`, { name, email, phone, password })
            .then(response => {
                console.log("User Added Succesfully 👍");
            })
            .catch(error => {
                console.log('Error occured while creating user ❌', error)
            })

    }
    return (
        <>
            {/* <h1>Signup Form</h1>
            <form onSubmit={handleSignin}>
                Name <input type="text" name='name' onChange={(e) => { setName(e.target.value) }} /> <br />
                email <input type="text" name='email' onChange={(e) => { setEmail(e.target.value) }} /> <br />
                phone <input type="number" name='phone' onChange={(e) => { setPhone(e.target.value) }} /> <br />
                password <input type="password" name='password' onChange={(e) => { setPassword(e.target.value) }} /> <br />
                <button type='submit'>Create User</button>
            </form> */}








            <div id='form'>
                <form autoComplete="off" onSubmit={handleSignin}>
                    <h1 className="a11y-hidden">Login Form</h1>
                    <div>
                        <label className="label-name">
                            <input type="text" className="text" name="name" placeholder="Name" tabIndex="1" required onChange={(e) => { setName(e.target.value) }} />
                            <span className="required">Name</span>
                        </label>
                    </div>
                    <div>
                        <label className="label-email">
                            <input type="email" className="text" name="email" placeholder="Email" tabIndex="1" required onChange={(e) => { setEmail(e.target.value) }} />
                            <span className="required">Email</span>
                        </label>
                    </div>
                    <div>
                        <label className="label-phone">
                            <input type="number" className="text" name="phone" placeholder="Phone" tabIndex="1" required onChange={(e) => { setPhone(e.target.value) }} />
                            <span className="required">Phone</span>
                        </label>
                    </div>
                    <input type="checkbox" name="show-password" className="show-password a11y-hidden" id="show-password" tabIndex="3" />
                    <label className="label-show-password" htmlFor="show-password">
                        <span>Show Password</span>
                    </label>
                    <div>
                        <label className="label-password">
                            <input type="text" className="text" name="password" placeholder="Password" tabIndex="2" required onChange={(e) => { setPassword(e.target.value) }} />
                            <span className="required">Password</span>
                        </label>
                    </div>
                    <input type="submit" value="Log In" />
                    {/* <div className="email">
                    <a href="#">Forgot password?</a>
                </div> */}
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

export default Signup