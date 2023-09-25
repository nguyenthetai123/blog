import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { toast } from 'react-toastify'
import { active } from '../Slices/userSlice'

const Active = () => {
    const { uid, token } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading}= useSelector((state)=>state.user)
    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            uid,
            token
        }
        dispatch(active(userData))
        toast.success("Your account has been activated! You can login now")
    }
    useEffect(()=>{
        if(loading){
           navigate('/')
        }
    })
  return (
    <div>
         <div>
            <div className="container auth__container">
                <h1 className="main__title">Activate Account  </h1>
                <button  className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                style={{ marginTop: '50px' }}
                                type='button' onClick={handleSubmit}>Activate Account</button>
            </div>
        </div>
    </div>
  )
}

export default Active