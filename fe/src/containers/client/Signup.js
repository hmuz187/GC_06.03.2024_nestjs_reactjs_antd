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
  LoadingOutlined,
  LockOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  getVerifyCodeSignUpFailure,
  getVerifyCodeSignUpRequest,
  getVerifyCodeSignUpSuccess,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
} from "../../store/reducers/userSlice";
import { authClientServices } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [verifyCode, setVerifyCode] = useState();
  const [isGetCode, setIsGetCode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetCode = async () => {
    if (!email) {
      message.error(`Please input your email`);
    } else {
      const data = { userEmail: email };
      dispatch(getVerifyCodeSignUpRequest());
      const response = await authClientServices.GET_VERIFY_CODE_SIGN_UP(data);
      console.log(response);
      const messageId = response
        ? response.data
          ? response.data.messageId
            ? response.data.messageId.messageId
              ? response.data.messageId.messageId
              : null
            : null
          : null
        : null;
      const messagePhrase = response
        ? response.data
          ? response.data.message
            ? response.data.message
            : null
          : null
        : null;
      const status = response
        ? response.data
          ? response.data.messageId
            ? response.data.messageId.status
              ? response.data.messageId.status
              : null
            : null
          : null
        : null;
      if (status === "ok") {
        message.success(`sent code to email!!! please check your mailbox`);
        dispatch(getVerifyCodeSignUpSuccess());
        setIsGetCode(false);
      }
      if (status != "ok") {
        dispatch(getVerifyCodeSignUpFailure());
        message.error(`${messagePhrase}`);
        message.error(
          `problem when check and send!!! please try again!!!`
        );
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    const dataInput = {
      username: userName,
      email: email,
      password: password,
      verifyCode: verifyCode,
  }
    if (!email || !password || !verifyCode || password.length < 6 || !userName) {
      message.error(`Please input all information`);
      setIsLoading(false);
    } else {
      dispatch(signUpRequest());

      const response = await authClientServices.SIGNUP(dataInput)
      console.log(response)
      const messagePhrase = response.data ? (response.data.message ? response.data.message : null) : null;
      const status = response ? (response.data ? (response.data.code ? response.data.code : null) : null) : null
      if (status == 200 || status == 201) {
          const user = response ? (response.data ? (response.data.metadata ? (response.data.metadata.user ? response.data.metadata.user : null) : null) : null) : null
          const clientInfo = { id: user._id, username: user.username }
          dispatch(signUpSuccess(clientInfo));
          message.success(`signup success account with email: ${dataInput.email} !!! please login!!!`);
          navigate('/login');
      }
      if (!(status == 200 || status == 201)) { 
        dispatch(signUpFailure());
        message.error(`Error:: ${messagePhrase}`);
        message.error(`Please check your information!!!`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  return (
    <div className="loginBg">
      <Form className="loginForm">
        <Typography.Title>Dapp Signup</Typography.Title>
        <Form.Item
          rules={[{ required: true, message: `Please input your name` }]}
          label="Name"
          name={"myName"}
        >
          <Input
            prefix={<UserAddOutlined />}
            type="text"
            placeholder="input your name here"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
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
        <Form.Item
          rules={[{ required: true, message: "please input verifyCode" }]}
          name={"verifyCode"}
          label="VerifyCode"
        >
          <Input
            type="text"
            placeholder="check mail and input"
            onChange={(e) => setVerifyCode(e.target.value)}
          />
        </Form.Item>
        {isGetCode ? (
          <>
            <Button
              type="primary"
              htmlType="button"
              onClick={handleGetCode}
              style={{ width: "100%" }}
            >
              Get verify code
            </Button>
          </>
        ) : (
          <>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSignup}
              style={{ width: "100%" }}
            >
              {!isLoading ? (
                <> Submit </>
              ) : (
                <>
                  <LoadingOutlined />
                </>
              )}
            </Button>
          </>
        )}

        <Divider>
          <Link to={"/login"} style={{ color: "green" }}>
            or Login{" "}
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

export default Signup;
