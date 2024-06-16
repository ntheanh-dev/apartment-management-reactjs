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
                if (action.payload) {
                    state.data = action.payload;
                }
            })
            .addCase(login.rejected, (state) => {
                state.status = 'rejected';
            })

            .addCase(changeAvatar.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(changeAvatar.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.data.avatar = action.payload;
                }
            })
            .addCase(changeAvatar.rejected, (state) => {
                state.status = 'rejected';
            });
    },
});

export const login = createAsyncThunk('user/fetchUserData', async (user, { rejectWithValue }) => {
    try {
        let res = await APIs.post(endPoints['login'], JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
        });
        cookie.save('token', res.data?.result?.token);
        let u = await authApi().get(endPoints['myInfo']);
        return u.data.result;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const changeAvatar = createAsyncThunk('user/changeAvatar', async (form, { rejectWithValue }) => {
    try {
        let res = await authApi().post(endPoints['changeAvatar'], form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data.result;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export default userReducer.reducer;
