import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import APIs, { authApi, endPoints } from '../configs/APIs';
import cookie from 'react-cookies';

export const userReducer = createSlice({
    name: 'user',
    initialState: {
        status: 'idle',
        data: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log(action.payload);
                state.data = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.status = 'rejected';
            });
    },
});

export const login = createAsyncThunk('user/fetchUserData', async (user) => {
    let res = await APIs.post(endPoints['login'], JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    });
    cookie.save('token', res.data?.result?.token);
    let u = await authApi().get(endPoints['myInfo']);
    return u.data.result;
});

export default userReducer.reducer;
