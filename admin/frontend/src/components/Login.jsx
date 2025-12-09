import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
const Home = () => {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const navigate=useNavigate()
const handleChange=(e)=>{
    const {name,value}=e.target

    if (name==='email')
        setEmail(value)
    else if(name==='password')
        setPassword(value)

}    
const handleSubmit=async(e)=>{
    e.preventDefault()

    console.log("Name is "+email+"\n"+"Password is "+password)
    
    try{
    const response=await axios.post('http://localhost:3000/api/details',{email,password})

    if(response.data.message)
      navigate('/home')
    }
    catch(error)
    {console.log(error)}

}

return <>
<Navbar/>
   <div  className="container-fluid d-flex justify-content-center align-items-center"
  style={{ height: '100vh', paddingTop: '56px' }}>
  <form    method="post"
    onSubmit={handleSubmit}
    className="border border-dark border-4"
    style={{ minWidth: '300px' ,padding:'20px'}}>
    <div className="mb-3">
      <label className="form-label">User ID:</label>
      <input type="text"
        name="email"
        onChange={handleChange}
        required
        className="form-control"/>
    </div>
    <div className="mb-3">
      <label className="form-label">Password:</label>
      <input type="password" name="password" onChange={handleChange} required className="form-control"/>
    </div>
    <div className="d-flex justify-content-center">
  <button type="submit" className="btn btn-outline-primary w-50" style={{ margin: '5px' }}>
    Login
  </button>
  <button
    type="reset" className="btn btn-outline-primary w-50" style={{ margin: '5px' }}>
    Cancel
  </button>
</div>
  </form>
</div>
  </>

}

export default Home