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
  UserOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  getVerifyCodeForgotPassword,
  forgotPasswordSuccess,
} from "../../store/reducers/userSlice";
import { authClientServices } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [verifyCode, setVerifyCode] = useState();

  const [isGetCode, setIsGetCode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetCode = async () => {
    const dataInput = { userEmail: email };
    if (!email) {
      message.error(`Please input your email`);
    } else {
      const response = await authClientServices.GET_VERIFY_CODE_FORGOT_PASSWORD(
        dataInput
      );
      // console.log(response)
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
        dispatch(getVerifyCodeForgotPassword());
        setIsGetCode(false);
      }
      if (status != "ok") {
        message.error(`${messagePhrase}`);
        message.error(`problem when check and send!!! please try again!!!`);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    }
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);

    const dataInput = {
      userEmail: email,
      password: password,
      verifyCode: verifyCode,
    };
    if (!email || !password || !verifyCode || password.length < 6) {
      message.error(`Please input all information`);
      setIsLoading(false);
    } else {
      const response = await authClientServices.FORGOT_PASSWORD(dataInput);
      const status = response
        ? response.data
          ? response.data.code
            ? response.data.code
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
      if (status == 200 || status == 201) {
        const user = response
          ? response.data
            ? response.data.metadata
              ? response.data.metadata.user
                ? response.data.metadata.user
                : null
              : null
            : null
          : null;
        const clientInfo = { id: user._id, username: user.username };
        dispatch(forgotPasswordSuccess(clientInfo));
        message.success(`success change your password`);
        navigate("/login");
      }
      if (!(status == 200 || status == 201)) {
        message.error(`${messagePhrase}`);
        message.error(
          `change password failed !!! please check your information!!!`
        );
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    }
  };

  return (
    <div className="loginBg">
      <Form className="loginForm">
        <Typography.Title>Dapp Forgot Password</Typography.Title>
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
          label="New password"
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
          rules={[
            {
              required: true,
              message: "please check your email and input verifyCode",
            },
          ]}
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
              onClick={handleForgotPassword}
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
          <Link to={"/Signup"} style={{ color: "green" }}>
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
            <Link to={"/login"}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ForgotPassword;
