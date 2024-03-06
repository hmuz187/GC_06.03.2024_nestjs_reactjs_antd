import React, { useState } from "react";
import "../../style/clientStyle.css";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
  message,
} from "antd";
import {
  HomeOutlined,
  LockOutlined,
  UserOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../../store/reducers/userSlice";
import { authClientServices } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password || password.length < 6) {
      message.error(`Please input all information`);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const dataInput = { email: email, password:password };
      dispatch(loginRequest, dataInput);
      const response = await authClientServices.LOGIN(dataInput);
      const status = response
        ? response.data
          ? response.data.code
            ? response.data.code
            : null
          : null
        : null;
      if (status === 200 || status === 201) {
        const user = response
          ? response.data
            ? response.data.metadata
              ? response.data.metadata.user
                ? response.data.metadata.user
                : null
              : null
            : null
          : null;
        const token = response
          ? response.data
            ? response.data.metadata
              ? response.data.metadata.token
                ? response.data.metadata.token
                : null
              : null
            : null
          : null;
        const clientInfo = {
          id: user._id,
          username: user.username,
          token: token.accessToken ? token.accessToken : null,
        };

        dispatch(loginSuccess(clientInfo));
        message.success(`login successful!!!`);
        navigate('/')
      }
      if (!(status === 200 || status === 201)) {
        dispatch(loginFailure());
        message.error(`login failed !!! please check your information!!!`);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    }
  };

  return (
    <div className="loginBg">
      <Form className="loginForm">
        <Typography.Title>Dapp Login</Typography.Title>
        <Form.Item
          rules={[{ required: true, message: `Please input your email` }]}
          label="Email"
          name={"myEmail"}
        >
          <Input
            prefix={<UserOutlined />}
            type="text"
            placeholder="input your email here"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: `Please input your password` },
            {
              min: 6,
              message: `Your password must be above 6`,
            },
          ]}
          label="Password"
          name={"myPassword"}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="input your password here"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleLogin}
          style={{ width: "100%" }}
        >
          {!isLoading ? (
            <> Login </>
          ) : (
            <>
              <LoadingOutlined />
            </>
          )}
        </Button>
        <Divider>
          <Link to={"/signup"} style={{ color: "green" }}>
            or Signup{" "}
          </Link>
        </Divider>
        <div></div>
        <Row
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Col flex={1} style={{ margin: "auto 0" }}>
            <Link to={"/"} style={{ color: "black" }}>
              {" "}
              <HomeOutlined /> Back to home{" "}
            </Link>
          </Col>
          <Col flex={1}>
            <Link to={"/forgotPassword"}>
              <Button type="primary" htmlType="submit">
                Forgot Password
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
