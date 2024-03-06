import {
  HomeFilled,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  Menu,
  Modal,
  Table,
  Typography,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { isLogin } from "../../auth/isLogin";
import { useDispatch, useSelector } from "react-redux";
import {
  logout
} from "../../store/reducers/userSlice";

const HeaderClient = () => {
  
  const user = useSelector(state => state.user);
  // console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };


  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const username = userInfo
    ? userInfo.username
      ? userInfo.username
      : null
    : null;

  useEffect(() => {}, [user]);

  const [islogin, setIsLogin] = useState(isLogin());

  const [stateModal, setStateModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setStateModal(false);
    setIsLogin(false);
  };

  const showModalLogout = () => {
    setStateModal(true);
  }

  const handleCancelModal = () => {
    setStateModal(false)
  }

  return (
    <div className="appHeader">
      <Link to={"/"}>
        <Image src={logo} height={50} preview={false} />
      </Link>
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "home",
          },
          {
            label: "About",
            key: "about",
          },
          {
            label: "Contact",
            key: "contact",
          },
          {
            label: "Blog",
            key: "blog",
            children: [
              { label: "Recent Posts", key: "recent-Posts" },
              { label: "Recommend Posts", key: "recommend-Post" },
            ],
          },
          {
            label: "Shop",
            key: "shop",
            children: [
              { label: "Baby Products", key: "baby-Products" },
              { label: "Mom Products", key: "mom-Products" },
              { label: "Women Products", key: "women-Products" },
            ],
          },
        ]}
      />
      <div className="appHeaderRight">
        {!islogin ? (
          <Link to={"/login"}>
            <UserOutlined
              className="loginHeaderIcon"
              style={{ color: "red" }}
            />
          </Link>
        ) : (
          <>
            {stateModal ? (
              <>
                <Modal
                visible = {stateModal}
                title = "Are you sure to logout ?"
                onCancel={handleCancelModal}
                destroyOnClose = {true}
                onOk={handleLogout}
                >
                </Modal>
              </>
            ) : (
              <></>
            )}
            <Button onClick={showModalLogout}>
              {username ? <>hi, {username}</> : <></>}
            </Button>
          </>
        )}

        <AppCart />
      </div>
    </div>
  );
};

const cartItemsData = [
  {
    id: "1",
    title: "Spring T-Shirt",
    price: 20,
    quantity: 3,
    total: 60,
  },
  {
    id: "2",
    title: "Summer Jeans",
    price: 40,
    quantity: 2,
    total: 80,
  },
];

const AppCart = () => {
  // const [cartItems, setCartItems] = useState([])
  // useEffect(()=>{
  //   getCart().then(res => {setCartItems(res.products)})
  // })
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutDrawer, setCheckoutDrawer] = useState(false);
  const [cartItems, setCartItems] = useState(cartItemsData);

  const onConfirmOrder = (values) => {
    console.log(values);
    setCartDrawerOpen(false);
    setCheckoutDrawer(false);
    message.success(`your order has been placed successfully!!!`);
  };

  return (
    <div>
      <Badge
        style={{ marginRight: "16px" }}
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={7}
      >
        <ShoppingCartOutlined className="shoppingCartHeaderIcon" />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your cart"
        // contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Name",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={value}
                    onChange={(value) => {
                      setCartItems((pre) =>
                        pre.map((cart) => {
                          if (record.id === cart.id) {
                            cart.total = cart.price * value;
                          }
                          return cart;
                        })
                      );
                    }}
                  ></InputNumber>
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return <span>Total : ${total}</span>;
          }}
        />
        <Button
          onClick={() => {
            setCheckoutDrawer(true);
          }}
          type="primary"
        >
          Check out your cart
        </Button>
      </Drawer>
      <Drawer
        open={checkoutDrawer}
        onClose={() => {
          setCheckoutDrawer(false);
        }}
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[
              { required: true, message: `Please enter your fullName` },
              { min: 5, message: `check your fullname again` },
            ]}
            label="Full Name"
            name="fullName"
          >
            <Input placeholder="Enter your fullname..." />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter your email..." />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input placeholder="Enter your address..." />
          </Form.Item>
          <Form.Item>
            <Checkbox>Cash on delivery</Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary">
            More methods coming soon
          </Typography.Paragraph>
          <Button type="primary" htmlType="submit">
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default HeaderClient;

/*
import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { HomeFilled } from "@ant-design/icons";
const { Header } = Layout;

const HeaderLinks = [
  { path: "/", name: "Home" },
  { path: "/blog", name: "Blog" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
  { path: "/shop", name: "Shop" },
];

const HeaderClient = () => {
  return (
    <div className="appHeader"> 
      <Menu 
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "home",
          },{
            label: <Link to="/about">About</Link>,
            key: "about",
          }, {
            label: <Link to="/contact">Contact</Link>,
            key: "contact",
          },{
            label: "Blog",
            key: "blog",
            children: [
              {label: <Link to="/blog">Recent Posts</Link>, key: "recentPosts"},
              {label: <Link to="/blog">Recommend Posts</Link>, key: "recommendPost"}
            ]
          }, {
            label: "Shop",
            key: "shop",
            children: [
              {label: <Link to="/shop">Baby Products</Link>, key: "babyProducts"},
              {label: <Link to="/shop">Mom Products</Link>, key: "momProducts"},
              {label: <Link to="/shop">Women Products</Link>, key: "womenProducts"}
            ]
          }

        ]}
      />
    </div>
  );
};

export default HeaderClient;
*/
