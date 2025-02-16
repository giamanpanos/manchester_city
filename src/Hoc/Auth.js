import React from "react";
import { Redirect } from "react-router-dom/";
import "../firebase";
import { getAuth } from "firebase/auth";

const AuthGuard = (Component) => {
  class AuthHoc extends React.Component {
    authCheck = () => {
      const user = getAuth().currentUser;
      if (user) {
        // we are using a class so that we can pass the props to the component which is the user who signed in
        return <Component {...this.props} />;
      } else {
        return <Redirect to="/" />;
      }
    };
    render() {
      return this.authCheck();
    }
  }
  return AuthHoc;
};

export default AuthGuard;
