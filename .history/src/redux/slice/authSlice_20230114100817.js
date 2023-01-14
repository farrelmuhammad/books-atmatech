import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    token: localStorage.getItem("token"),
}

const loginUser = createAsyncThunk('user',async(body) => {
    let res = await axios.post("", {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    return await res.json()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setData: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        cleardata: (state, action) => {
            return initialState;
        }
    }
});

export const { setToken, setData, cleardata } = authSlice.actions;

export default authSlice.reducer;
