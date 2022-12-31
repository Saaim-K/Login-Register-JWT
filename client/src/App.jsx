import { React, useState } from 'react'

const App = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <>
      <form>
        name<input type="text" onChange={(e) => { setName(e.target.value) }} /> <br />
        email<input type="text" onChange={(e) => { setEmail(e.target.value) }} /> <br />
        password<input type="text" onChange={(e) => { setPassword(e.target.value) }} /> <br />
      </form>
      {name}
      {email}
      {password}
    </>
  )
}

export default App