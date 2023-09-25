import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./Slices/userSlice";
const store= configureStore({

    reducer:{
        user: userreducer
    }
})
export default store;