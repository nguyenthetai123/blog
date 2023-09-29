import axios from "axios"
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

// Register a New Account for user
 export const register = createAsyncThunk(
    'user/register',
    async({name, email, password, re_password})=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, {name, email, password, re_password}, config);
        if (res.status===201){
            return res.data
        }else{
            return res.data.error
        }
      
    }
)
//activate email
export const active = createAsyncThunk(
    'user/activate',
    async({uid, token})=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, {uid, token}, config);
        if (res.status === 204) {
            return res.data
        }else{
            alert('active fail')
        }
    }
)
//get user infor
export const load_user=createAsyncThunk(
    'load_user',
    async()=>{
        if (localStorage.getItem('access')){
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
            if(res.status===200){
                return res.data
            }else{
                return res.data.error
            }
        }
    }
)
export const login=createAsyncThunk(
    'login',
    async({email,password})=>{
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, {email,password}, config);
        if (res.status === 200){
            return res.data
        }
    }

)
const logout= createAsyncThunk(
    'logout',
    async()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
           
        
    }
)

const initialState={
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    loading: false
}

const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.loading=false
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.access=localStorage.removeItem('access')
            state.refresh=localStorage.removeItem('refresh')
            state.user=null
            state.isAuthenticated=true
            state.loading= true
        })
        .addCase(register.rejected,(state,action)=>{
            state.access=localStorage.removeItem('access')
            state.refresh=localStorage.removeItem('refresh')
            state.user=null
            state.isAuthenticated=false
            state.loading= false
        })
        .addCase(active.pending,(state)=>{
            state.loading= false
        })
        .addCase(active.fulfilled,(state,action)=>{
          
                state.loading=true
            
        })
        .addCase(active.rejected,(state,action)=>{
            state.loading= false
        })
        .addCase(load_user.pending,(state)=>{
            state.isAuthenticated=null
            state.user=null
            state.loading=false
        })
        .addCase(load_user.fulfilled,(state,action)=>{
            state.isAuthenticated=true
            state.user=action.payload
          
        })
        .addCase(load_user.rejected,(state,action)=>{
           
            state.user=null
            state.access=null
            state.refresh=null
            state.isAuthenticated=null
          
        })
        .addCase(login.pending,(state)=>{
            state.loading=false
            state.access=null
            state.refresh=null
            state.isAuthenticated=null
        })
        .addCase(login.fulfilled,(state,action)=>{
            return{
               
                isAuthenticated:true,
                loading:true,
                user:action.payload,
                
            }
           
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.access=null
            state.refresh=null
            state.isAuthenticated=null
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            state.access=null
            state.access=null
            state.isAuthenticated=null
        })
    }
})
const {reducer:userreducer}=userSlice;

export default userreducer