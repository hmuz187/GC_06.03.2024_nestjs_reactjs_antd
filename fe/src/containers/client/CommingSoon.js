import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const CommingSoon = () => {
  return (
    <Result
    icon={<SmileOutlined />}
    title="Thank you for visiting, this page will be comming soon!"
    extra={<Link to={'/'}><Button type="primary">Next</Button></Link>}
  />
  )
}

export default CommingSoon