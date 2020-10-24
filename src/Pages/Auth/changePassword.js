import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useStoreState, useStoreActions} from 'easy-peasy'
import { Spin,notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24, "color" : "white" }} spin />;
    
const ChangePassword = (props) => {
    const { requestResponse, isLoading } = useStoreState((state) => state.auth);
    const {changePassword,clearResponse} = useStoreActions((Actions) => Actions.auth);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
        data:{
          password: password,
          confirmPassword:confirmPassword,
          token: props.match.params.token
        },
        history: props.history
      };
      changePassword(params);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="signup-form">
            <div>
              <h2>Create New Password</h2>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required="required"
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Send Mail
                  </button>
                )}
              </div>
              <div className="text-center">
                Already Have an Account? <Link to="/login">Login</Link>.
              </div>
            </div>
          </div>
        </div>
      </form>
    );
}

export default ChangePassword;