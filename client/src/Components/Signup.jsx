import { useState } from 'react'
import axios from 'axios'

let baseUrl = '';
if (window.location.href.split(':')[0] === 'http') { baseUrl = 'http://localhost:5426' }

const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')


    const signupHandler = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}/signup`, { firstName, lastName, age, email, gender, phone, password })
            .then(response => {
                console.log("User Added Succesfully 👍");
            })
            .catch(error => {
                console.log('Error occured while creating user ❌', error)
            })

    }
    return (
        <>
            <h1>Signup Form</h1>
            <form onSubmit={signupHandler}>
                firstName <input type="text" name='firstName' onChange={(e) => { setFirstName(e.target.value) }} /> <br />
                lastName <input type="text" name='lastName' onChange={(e) => { setLastName(e.target.value) }} /> <br />
                age <input type="number" name='age' onChange={(e) => { setAge(e.target.value) }} /> <br />
                email <input type="text" name='email' onChange={(e) => { setEmail(e.target.value) }} /> <br />
                gender <input type="text" name='gender' onChange={(e) => { setGender(e.target.value) }} /> <br />
                phone <input type="number" name='phone' onChange={(e) => { setPhone(e.target.value) }} /> <br />
                password <input type="password" name='password' onChange={(e) => { setPassword(e.target.value) }} /> <br />
                <button type='submit'>Create User</button>
            </form>
        </>
    )
}

export default Signup