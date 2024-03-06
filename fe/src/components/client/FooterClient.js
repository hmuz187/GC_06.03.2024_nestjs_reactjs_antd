import { Typography } from 'antd'
import React from 'react'

const FooterClient = () => {
  return (
    <div className='appFooter'>
      <Typography.Link href='https://google.com/' target={"_blank"} style={{color:"black"}}>Privacy Policy</Typography.Link>
      <Typography.Link href='https://google.com/' target={"_blank"}  style={{color:"black"}}>Term & Conditions</Typography.Link>
      <Typography.Link href='https://google.com/' target={"_blank"}  style={{color:"black"}}>Return Policy</Typography.Link>
      <Typography.Link href='tel:+123456789' target={"_blank"}  style={{color:"black"}}>(Call us: +123456789)</Typography.Link>
    </div>
  )
}

export default FooterClient