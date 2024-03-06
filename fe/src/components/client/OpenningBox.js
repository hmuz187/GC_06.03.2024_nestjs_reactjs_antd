import React from 'react';
import { Card, Col, Row } from 'antd';
import OpeningBoxSmall from './OpeningBoxSmall';
import clock from '../../../../assets/icons/clock.svg';
import marker from '../../../../assets/icons/marker.svg';
import phone from '../../../../assets/icons/phone.svg';

const { Meta } = Card;

const OpenningBox = () => {
  const openingBoxData = [
    {
      id: 1,
      name: 'Opening Hours',
      description: 'Open 9.00 am to 5.00 pm everyday',
      icon: clock,
      bgClass: 'bg-gradient-to-r from-theme-2nd to-theme-1st rounded-[14px]',
    },
    {
      id: 2,
      name: 'Our Locations',
      description: 'Open 9.00 am to 5.00 pm everyday',
      icon: marker,
      bgClass: 'bg-gradient-to-r from-theme-2nd to-theme-1st rounded-[14px]',
    },
    {
      id: 3,
      name: 'Contact Us',
      description: 'Open 9.00 am to 5.00 pm everyday',
      icon: phone,
      bgClass: 'bg-gradient-to-r from-theme-2nd to-theme-1st rounded-[14px]',
    },
  ];

  return (
    <section className='bg-pink-50 opacity-90 mx-auto px-[40px] pb-[100px]'>
      <Row gutter={[16, 16]}>
        {openingBoxData.map((card) => (
          <Col key={card.id} xs={24} md={12} lg={8}>
            <Card
              hoverable
              className={card.bgClass}
              cover={<img alt={card.name} src={card.icon} />}
            >
              <Meta title={card.name} description={card.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default OpenningBox;
