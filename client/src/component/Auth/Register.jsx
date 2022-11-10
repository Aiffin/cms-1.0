import React,{useState} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Register(props) {
 const [user,setUser]=useState({
    name:"",
    email:"",
    mobile:"",
    password:""
 })

 const navigate = useNavigate()

 const readValue=(e)=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value})
 }

 const submitHandler=async(e)=>{
    e.preventDefault()
    try {
        console.log('user=',user)
        await axios.post(`/api/v1/auth/register`,user)
            .then(res=>{
                console.log('after register=',res.data);
                toast.success("User registered successfully")
                navigate('/login')
            }).catch(err=>toast.error(err.message))
    } catch (err) {
        toast.error(err.response.data.msg)
    }
 }
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3">Register</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form action="" autoComplete='off' onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" value={user.name} onChange={readValue} className="form-control" required />
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={user.email} onChange={readValue} className="form-control" required />
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="mobile">Mobile</label>
                                <input type="text" name="mobile" id="mobile" value={user.mobile} onChange={readValue} className="form-control" required />
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" value={user.password} onChange={readValue} className="form-control" required />
                            </div>

                            <div className="form-group mt-2">
                                <input type="submit" value="Submit" className='btn btn-outline-success' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register