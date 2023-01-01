import { React, useState } from 'react'
import axios from 'axios'

let baseUrl = '';
if (window.location.href.split(':')[0] === 'http') { baseUrl = 'http://localhost:5426' }

const App = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')


  const createUser = (e) => {
    e.preventDefault();
    if (password === confirmpassword) {
      axios.post(`${baseUrl}/signup`, { firstName, lastName, age, email, gender, phone, password, confirmpassword })
        .then(response => {
          console.log("User Added Succesfully 👍");
        })
        .catch(error => {
          console.log('Error occured while adding product ❌', error)
        })
    }
    else {
      console.log("Passwords didn't Match")
    }
  }



  return (
    <>
      <form onSubmit={createUser}>
        firstName <input type="text" name='firstName' onChange={(e) => { setFirstName(e.target.value) }} /> <br />
        lastName <input type="text" name='lastName' onChange={(e) => { setLastName(e.target.value) }} /> <br />
        age <input type="number" name='age' onChange={(e) => { setAge(e.target.value) }} /> <br />
        email <input type="text" name='email' onChange={(e) => { setEmail(e.target.value) }} /> <br />
        gender <input type="text" name='gender' onChange={(e) => { setGender(e.target.value) }} /> <br />
        phone <input type="number" name='phone' onChange={(e) => { setPhone(e.target.value) }} /> <br />
        password <input type="password" name='password' onChange={(e) => { setPassword(e.target.value) }} /> <br />
        confirmpassword <input type="password" name='confirmpassword' onChange={(e) => { setConfirmPassword(e.target.value) }} /> <br />
        <button type='submit'>Create User</button>
        <h1>{firstName}</h1>
        <h1>{lastName}</h1>
        <h1>{age}</h1>
        <h1>{email}</h1>
        <h1>{gender}</h1>
        <h1>{phone}</h1>
        <h1>{password}</h1>
        <h1>{confirmpassword}</h1>
      </form>
    </>
  )
}

export default App