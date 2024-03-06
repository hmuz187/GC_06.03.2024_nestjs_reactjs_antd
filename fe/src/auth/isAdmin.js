export const isAdmin = () => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const id = userInfo ? (userInfo.id ? userInfo.id : null) : null

    // return (id==='65ddfed87dcf24ee90160d10')
    return (id==='65de20097dcf24ee90160d41')
    
}


