import axios from "../axios";

const clientPath = '/v1/access';


export const signUp = async (data) => {
    try {
        // console.log(data)
        const response = await axios({
            url:`${clientPath}/signUp`,
            method: 'post',
            data
        })
        return (response)
    } catch(error) {
        return (error.response)
    }
}

export const getVerifyCodeSignup = async (data) => {
    try {
        // console.log(data)
        const response = await axios({
            url:`${clientPath}/signup/getVerifyCode`,
            method: 'POST',
            data
        })
        return (response)
    } catch(error) {
        return (error.response)
    }
}


export const getVerifyCodeForgotPassword = async (data) => {
    try {
        // console.log(data)
        const response = await axios({
            url:`${clientPath}/forgotPassword/getVerifyCode`,
            method: 'post',
            data
        })
        return (response)
    } catch(error) {
        return (error.response)
    }
}


export const forgotPassword = async (data) => {
    try {
        // console.log(data)
        const response = await axios({
            url:`${clientPath}/forgotPassword`,
            method: 'post',
            data
        })
        return (response)
    } catch(error) {
        return (error.response)
    }
}



export const logIn = async (data) => {
    try {
        // console.log(data)
        const response = await axios({
            url:`${clientPath}/signin`,
            method: 'post',
            data
        })
        return (response)
    } catch(error) {
        return (error.response)
    }
}




export const logOut = async (data) => {
    try {
        // console.log(data)
        const response = await axios({
            url:`${clientPath}/logout`,
            method: 'post',
            data
        })
        return (response)
    } catch(error) {
        return (error.response)
    }
}





