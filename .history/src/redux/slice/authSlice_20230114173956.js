import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem("token"),
    name: "",
    profilePhoto: "",
    cityId: 0,
    phone: "",
    address: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setProfilePhoto: (state, action) => {
            state.profilePhoto = action.payload;
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

export const { setToken, setName, setProfilePhoto, setData, cleardata } = authSlice.actions;

export default authSlice.reducer;