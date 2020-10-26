import React from 'react'
import { Redirect, Route } from "react-router-dom";
import Extend from '../Components/layout'
import {token} from '../Store/configs/index'
import Loader from '../Components/loader'

<<<<<<< HEAD
async function getToken (){
  const key = await token;
  return key
}
const User = ({isAuthed, component:Component, ...rest }) => (

    <Route {...rest} render={ props => (
      getToken() && isAuthed  ? (
=======
const User = ({isAuthed, component:Component, ...rest }) => (
    
    <Route {...rest} render={ props => (
      token && isAuthed  ? (
>>>>>>> 97c58ad7a3bd1e5510eb542888089ab60d68573c
        <Loader>
            <Extend>
                <Component {...props} />
            </Extend>
        </Loader>
        ) : (
          <Redirect
            to={{ pathname: "/login", location: { from: props.location } }}
          />
        )
  )} />
)

export default User


