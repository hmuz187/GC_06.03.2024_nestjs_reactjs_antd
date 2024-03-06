import React from "react";
import { Layout } from "antd";
const {Footer} = Layout;

const FooterCopyRight = () => {
  return (
    <div>
      <Footer style={{ textAlign: "center", padding: "8px 8px"}}>
        Copyright ©2016 Created by DApp Team
      </Footer>
    </div>
  );
};

export default FooterCopyRight;
