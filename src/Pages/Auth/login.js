import React, {useState, useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {useStoreState, useStoreActions} from 'easy-peasy'
import { Spin,notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24, "color" : "white" }} spin />;
    
const Login = (props) => {
    let history = useHistory();
    const { requestResponse, isLoading } = useStoreState((state) => state.auth);
    const {login,clearResponse} = useStoreActions((Actions) => Actions.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const openNotificationWithIcon = type => {
      notification[type]({
        message: 'Notification Title',
        description:requestResponse.msg
      });
    };

    useEffect(() => {
      if (requestResponse !== null) {
        openNotificationWithIcon(requestResponse.type)
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
        },
        history : history
      };
      login(params);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="signup-form">
            <div>
              <h2>Sign In</h2>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required="required"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    required="required"
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
                    Login
                  </button>
                )}
              </div>
              <div className="text-center">
                Dont have an account? <Link to="/register">Register here</Link>.
              </div>
              <div className="text-center">
               <Link to="/forgot-password">Forgot Password?</Link>.
              </div>
            </div>
          </div>
        </div>
      </form>
    );
}
  
export default Login;