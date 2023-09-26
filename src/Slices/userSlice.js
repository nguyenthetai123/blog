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
        // .addCase(register.rejected,(state,action)=>{
        //     state.access=localStorage.removeItem('access')
        //     state.refresh=localStorage.removeItem('refresh')
        //     state.user=null
        //     state.isAuthenticated=false
        //     state.loading= false
        // })
        .addCase(active.pending,(state)=>{
            state.loading= false
        })
        .addCase(active.fulfilled,(state,action)=>{
          
                state.loading=true
            
        })
        .addCase(active.rejected,(state,action)=>{
            state.loading= false
        })
    }
})
const {reducer:userreducer}=userSlice;

export default userreducer