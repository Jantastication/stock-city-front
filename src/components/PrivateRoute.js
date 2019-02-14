import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

const _PrivateRoute = ({ component: Component, render, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        Component ? (
          <Component {...props} />
        ) : (
          render(props)
        )
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export const PrivateRoute = withRouter(_PrivateRoute);
