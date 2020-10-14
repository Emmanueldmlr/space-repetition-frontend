import React, { useEffect} from 'react'
import {useStoreActions, useStoreState} from 'easy-peasy'
import { Result, Button, Spin } from "antd";
import {Link} from 'react-router-dom'

function EmailConfirm(props) {
    const {isLoading, requestResponse} = useStoreState(State => State.auth);
    const confirmEmail = useStoreActions((Actions) => Actions.auth.confirmEmail);
    const { match: { params } } =props;
    useEffect(() => {
        confirmEmail(params.token)
    }, [])
    return (
        <>
            {
                !isLoading ?       
                    requestResponse !== null ?
                        requestResponse.type === 'success' ?
                            <Result
                            status="success"
                            title="Email Verification"
                            subTitle={requestResponse.msg}
                            extra={[
                            <Button type="primary" key="console">
                                <Link to="/login">Login</Link>
                            </Button>
                            ]}
                        />
                        :
                            <Result
                            status="warning"
                            title="Email Verification"
                            subTitle={requestResponse.msg}
                            extra={[
                            <Button type="primary" key="console">
                                <Link to="/login">Home</Link>
                            </Button>
                            ]}
                        />
                        
                :
                null                          
                :
                <Spin className='centralize' tip="Loading..."/>     
            }
        </>
    )
}

export default EmailConfirm



