import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi';

// -----------------------------
export const getUserInfo = createAsyncThunk(
  'users/getUserInfo',
  async (_, thunkAPI) => {
    try {
      const apiRes = await userApi.getUserInfo();
      const { status } = apiRes;
      if (status === 200) {
        const user = apiRes.data;
        thunkAPI.dispatch(
          updateUserInfo({
            isAuth: true,
            isLoading: false,
            userId: user._id,
            ...user
          })
        );
      }
    } catch (error) {
      thunkAPI.dispatch(updateUserInfo({ isAuth: false, isLoading: false }));
    }
  }
);

// -----------------------------
const initialState = {
  isLoading: true,
  isAuth: false,
  accountId: '',
  userId: '',
  verified: false,
  username: '',
  name: '',
  email: '',
  avt: ''
};

// -----------------------------
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

const { reducer, actions } = userSlice;
export const { updateUserInfo } = actions;
export default reducer;
