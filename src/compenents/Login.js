import React, { useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom'
import { login,load_user } from '../Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
const Login = () => {
  const [formData, setFormData] = useState({
    "email": "",
    "password": "",
})
  const { 
    email,
    password
  } = formData;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isAuthenticated,user}=useSelector((state)=>state.user) 
  const handleChange = (e) => {
    setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    })
    )
}
const handleSubmit = (e) => {
  e.preventDefault()

  const userData = {
      email,
      password,
  }
  dispatch(login(userData))
}
useEffect(()=>{
  if(isAuthenticated||user){
    navigate("/")
    toast.success("login success")
  }else{
    toast.success("login fail")
    toast.error("please check your account")
  }
  dispatch(load_user())
},[isAuthenticated,user,navigate,dispatch])

  return (
   
    <div class="flex items-center justify-center">
            <div class="w-full max-w-md">
              <form   class="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
           
                <div
                  class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
                >
               Login
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-normal mb-2"
                    for="username"
                  >
                    Email
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    v-model="form.email"
                    type="email"
                    required
                    autofocus
                    placeholder="Email"
                    onChange={handleChange}
                    value={email}
                  />
                </div>
                <div class="mb-6">
                  <label
                    class="block text-gray-700 text-sm font-normal mb-2"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="form.password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={handleChange}
                        value={password}
                    autocomplete="current-password"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <button class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" onClick={handleSubmit} type="submit">Sign In</button>
                  <Link
                    class="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
                    href="#"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
             
            </div>
          </div>
  )
}

export default Login