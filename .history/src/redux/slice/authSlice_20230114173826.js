import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem('token'));

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await authService.login(email, password);
            return { user: data }
        } catch (error) {
            console.log(error);
            // const message =
            //     (error.response &&
            //         error.response.data &&
            //         error.response.data.message) ||
            //     error.message ||
            //     error.toString();
            // // thunkAPI.dispatch(setMessage(message));
            // return thunkAPI.rejectWithValue();
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout", async () => {
        await authService.logout();
    }
)

const initialState = user ? { isLoggedin: true, user } : { isLoggedin: false, user: null }

const authSlice = combineReducers({
    name: "auth",
    initialState,
    reducers: {
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        }
    }
})

const { authReducer } = authSlice;

export default authReducer;