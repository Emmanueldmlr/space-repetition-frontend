import React, {useEffect} from 'react'
import { Result, Button,notification } from "antd";
import {sessionItem} from '../../Store/configs/index'
import {useStoreActions, useStoreState} from 'easy-peasy'

function AccountVerification() {
  const user = JSON.parse(sessionStorage.getItem(sessionItem))
  const {isLoading,requestResponse} = useStoreState(state => state.auth)
  const {resendToken, clearResponse} = useStoreActions(Actions => Actions.auth)
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
  }, [isLoading])

  const sendLink = (token) => {
    resendToken(token)
  }
  return (
    <Result
      status="warning"
      title="Your Account is not Yet Verified"
      subTitle="Kindly Click on the Button in the Email Sent to you or Click on the Button Below"
      extra={
          isLoading ? 
            <Button disabled type="primary" key="console">
              Loading
            </Button>
          :
            <Button onClick={() => sendLink(user.token)} type="primary" key="console">
              Resend Email
            </Button>
      }
    />
  );
}

export default AccountVerification
