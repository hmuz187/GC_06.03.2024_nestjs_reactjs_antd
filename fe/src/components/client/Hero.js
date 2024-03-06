import React from "react";
import { Button } from "antd";
import { Carousel } from "antd";
import "../../style/clienthome.css";

const items = [
  {
    key: "1",
    title: "Your smile start here",
    content:
      "Our innovative web and mobile payment solutions make transactions fast, secure, and effortless for both you and your customers. Say goodbye to the hassle of traditional payment methods and embrace the future of seamless payments.",
  },
  {
    key: "2",
    title: "Work better together. Schedule meetings",
    content:
      "Collaborate and achieve your goals as a team. Join forces, share ideas and leverage each others strengths to reach new heights together. Let's work together and create a brighter future for us all.",
  },
  {
    key: "3",
    title: "The best services to increase your healthy life",
    content:
      "Boost your productivity and streamline your workday with our cutting-edge app. Stay organized, prioritize tasks, and never miss a deadline. Get more done in less time and achieve your goals faster than ever before.",
  },
];

function Hero() {
  return (
    <div id="hero" className="heroBlock" style={{display:"block", padding:"30px", opacity:"0.8"}}>
      <Carousel autoplay autoplaySpeed={2000}>
      {items.map(item => {
          return (
            <div key={item.key} className="container-fluid">
              <div className="content">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <div className="btnHolder">
                  <Button type="primary" size="large">Learn More</Button>
                  <Button size="large"><i className="fas fa-desktop"></i> Watch a Demo</Button>
                </div>
              </div>
            </div>  
          );
        })}
      </Carousel>
    </div>
  );
}

// const Hero = () => {
//   return (
    // <div style={{
    //     display: 'block', width: 700, padding: 30
    //   }}>
//         <>
//   <Carousel autoplay autoplaySpeed={2000}>
//     <div>
//       <h3 style={{ backgroundColor: 'red',
//                    height: 100 }}>Item 1</h3>
//     </div>
//     <div>
//       <h3 style={{ backgroundColor: 'blue',
//                    height: 100 }}>Item 2</h3>
//     </div>
//     <div>
//       <h3 style={{ backgroundColor: 'yellow',
//                    height: 100 }}>Item 3</h3>
//     </div>
//   </Carousel>
//         </>
//       </div>
//   );
// };
export default Hero;
