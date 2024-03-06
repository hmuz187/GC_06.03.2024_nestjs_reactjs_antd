import React, { useState } from 'react';

import { Button, Modal } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';


const Work = () => {
    const [state, setState] = useState(false);

    const showModal = () => {
      setState(true);
    };
  
    const handleCancel = e => {
      setState(false);
    };

    return (
        <div id="works" className="block worksBlock">
          <div className="container-fluid">
            <div className="titleHolder">
              <h2>How it works</h2>
              <p>check our latest video to know how it works</p>
            </div>
            <div className="contentHolder">
              <Button size="large" onClick={showModal}><PlayCircleOutlined/></Button>
            </div>
            <Modal
              title="Woocommerce Tutorial"
              visible = {state}
              onCancel={handleCancel}
              footer={null}
              destroyOnClose = {true}
            >
              <iframe title="Woocommerce Tutorial" width="100%" height="350" src="https://www.youtube.com/embed/PqS2YDItY3Y&list=RDMMPqS2YDItY3Y"></iframe>
            </Modal>
          </div>
        </div>
      );
  
}

export default Work