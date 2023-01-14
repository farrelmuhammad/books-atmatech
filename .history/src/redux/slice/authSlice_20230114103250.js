import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem('token'));

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await authService.login(email, password);
            return { user: data }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            // thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)