import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom"
import { useStoreState, useStoreActions } from "easy-peasy";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { notification } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24, "color" : "white" }} spin />;
const Register = (props) => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { requestResponse, isLoading } = useStoreState((state) => state.auth);
  const { register, clearResponse } = useStoreActions((Actions) => Actions.auth);

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Notification Title',
      description:requestResponse.msg
    });
  };

  useEffect(() => {
    if (requestResponse !== null) {
      if (requestResponse.type === "success") {
        openNotificationWithIcon('success')
      } else {
        openNotificationWithIcon('error')
      }
      setTimeout(() => {
        clearResponse();
      }, 4000);
    } else return;
  }, [requestResponse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      data: {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        nickname:nickname
      },
      history: props.history,
    };
    register(params);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="signup-form">
        <h2>Create Account</h2>
        <p className="lead">It's free and hardly takes more than 30 seconds.</p>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-user"></i>
            </span>
            <input
              type="text"
              className="form-control"
              name="nickname"
              placeholder="Nickname"
              required="required"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-paper-plane"></i>
            </span>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email Address"
              required="required"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              required="required"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-lock"></i>
              <i className="fa fa-check"></i>
            </span>
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              placeholder="Confirm Password"
              required="required"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          {isLoading ? (
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled="disabled"
            >
              <Spin indicator={antIcon} />
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
            >
              Register
            </button>
          )}
        </div>
        <div className="text-center">
          Already have an account? <Link to="/login">Login here</Link>.
        </div>
         <div className="text-center">
            {
                requestResponse !== null ?
                    requestResponse.type === 'success' ?
                        <p style={{ fontSize: "15px", color: "green" }}>
                            { requestResponse.msg}
                        </p>
                    :
                        <p style={{ fontSize: "15px", color: "red" }}>
                            { requestResponse.msg}
                        </p>
                :
                null
            }
          </div>
      </div>
    </form>
  );
}

export default Register;
