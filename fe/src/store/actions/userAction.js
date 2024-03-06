import { 
  logIn, 
  signUp, 
  getVerifyCodeSignup, 
  getVerifyCodeForgotPassword, 
  forgotPassword, 
  logOut 
} from '../../apis/client'

const LOGIN = (data) => {   //{ username, password }
    return logIn(data)
}

const LOGOUT = (data) => {
    return logOut(data)
}

const SIGNUP = (data) => {
    return signUp(data)
}  //{username, email, password, verifyCode}


const GET_VERIFY_CODE_SIGN_UP = (data) => {
    return getVerifyCodeSignup(data)
}

const FORGOT_PASSWORD = (data) => {
    return forgotPassword(data)
}

const GET_VERIFY_CODE_FORGOT_PASSWORD = (data) => {
    return getVerifyCodeForgotPassword(data)
}

export const authClientServices = {
    LOGIN,
    LOGOUT,
    SIGNUP,
    FORGOT_PASSWORD,
    GET_VERIFY_CODE_SIGN_UP,
    GET_VERIFY_CODE_FORGOT_PASSWORD
}
