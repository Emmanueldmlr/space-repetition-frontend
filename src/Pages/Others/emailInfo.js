import React from "react";
import {Result, Button} from 'antd'
import {Link} from 'react-router-dom'

const EmailInfo = () =>{
    return (
      <Result
        status="success"
        title="Registration was Successful. "
        subTitle="A Mail Has Been Sent To Your Email, Kindly Follow Through"
        extra={[
          <Button type="primary" key="console">
            <Link to="/login">Login</Link>
          </Button>
        ]}
      />
    );
}

export default EmailInfo