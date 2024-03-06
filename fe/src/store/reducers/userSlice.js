import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: { loggedIn: false, loggingIn: false },
  user: null,
  token: null,
  options: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.user = action.payload.email;
      state.status.loggingIn = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.status.loggedIn = true;
      state.status.loggingIn = false;
      state.user = action.payload;
      state.token = action.payload.token;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    loginFailure: (state) => {
      state = initialState;
    },
    logout: (state) => {
      state = initialState;
      localStorage.removeItem("userInfo");
    },
    forgotPasswordSuccess(state, action) {
        state.user = action.payload.user;
        localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    signUpSuccess(state, action) {
        state.user = action.payload.user;
        localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    getVerifyCodeForgotPassword: (state) => {
      state.options = { getVerifyCode: `done` };
    },
    getVerifyCodeSignUpRequest(state) {
      state.options = { getVerifyCode: `in processing` };
    },
    getVerifyCodeSignUpSuccess(state) {
      state.options = { getVerifyCode: `done` };
    },
    getVerifyCodeSignUpFailure(state) {
      state.options = { getVerifyCode: `failure` };
    },
    signUpRequest(state) {
        state.options = { signUpRequest: `in processing` };
    },
    signUpFailure(state) { 
        state.options = { signUpRequest: `failure` };
    },
  },
});

export const { 
    loginRequest, loginSuccess, loginFailure,
    logout,
    signUpRequest, signUpSuccess, signUpFailure,
    getVerifyCodeSignUpRequest,getVerifyCodeSignUpFailure, getVerifyCodeSignUpSuccess,
    forgotPasswordSuccess,
    getVerifyCodeForgotPassword,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
