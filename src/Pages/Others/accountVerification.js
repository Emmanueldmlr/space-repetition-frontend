import React from 'react'
import { Result, Button } from "antd";

function AccountVerification() {
    return (
      <Result
        status="warning"
        title="Your Account Has not Yet Verified"
        subTitle="Kindly Click on the Button in the Email Sent to you or Click on the Button Below"
        extra={
          <Button type="primary" key="console">
            Resend Email
          </Button>
        }
      />
    );
}

export default AccountVerification
