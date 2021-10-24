import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import classes from "./Login.module.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
const Login = () => {
  
  const dispatch = useStateValue()[1]
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className={classes.login}>
      <div className={classes.login__container}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"
          alt=""
        />
        <div className={classes.login__text}>
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
