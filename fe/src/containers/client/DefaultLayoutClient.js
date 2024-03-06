import React from "react";
import { CC_HeaderClient, CC_FooterClient, CC_FooterCopyRight } from "../../components/index";
import '../../style/clientStyle.css'

const DefaultLayoutClient = ({ children }) => {
  return (
    <div className="defaultLayoutClient">
      <CC_HeaderClient />
      <div className="appContent">{children}</div>
      <CC_FooterClient/>
      <CC_FooterCopyRight/>
    </div>
  );
};

export default DefaultLayoutClient;
