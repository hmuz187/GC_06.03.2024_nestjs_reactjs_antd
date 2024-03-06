
import {useSelector} from 'react-redux';

export const isLogin = () => {

    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const username = userInfo ? (userInfo.username ? userInfo.username : null) : null

    return (username ? true : false)

}


