import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthenticatedRoute = ({
  component: ComponentToBeRendered,
  props: cProps,
  ...rest
}) => (
  // Look at the props that are passed in to check if a user is authenticated.
  <Route
    {...rest}
    // If user is authenticated, then render passed in component
    render={props =>
      cProps.isAuthenticated ? (
        <ComponentToBeRendered {...props} {...cProps} />
      ) : (
        // if the user is not authenticated, then redirect to login page
        <Redirect
          to={`/login?redirect=${props.location.pathname}${
            props.location.search
          }`}
        />
      )
    }
  />
);
