import React, { useEffect } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';


// Layout import
// import Layout from '../layouts/default';

// Page import
// import Loading from '../pages/Loading';

// Theme import
import lightTheme from '../styles/themes/light';

// Interfaces
interface IChildren extends RouteProps {
  component: any;
  isPrivate?: boolean;
}

const RouteWrapper = ({
  component: Component,
  isPrivate,
  ...rest
}: IChildren) => {
  // Get dispatch hook

  // Public route
  // !signed && !isPrivate
  return (
    <ThemeProvider theme={lightTheme}>
      <Route component={Component}   />
    </ThemeProvider>
  );
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

export default RouteWrapper;
