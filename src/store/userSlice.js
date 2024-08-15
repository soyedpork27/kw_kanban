import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData : {
    id : '',
    name : '',
    nickName : '',
    role : 0,
  },
  isAuth : false,
  isLoading : false,
  error : ''
};

const userSlice = createSlice({
  name : 'user',
  initialState,
  reducers : {},
  extraReducers : (builder) => {

  }
});


export default userSlice.reducer;