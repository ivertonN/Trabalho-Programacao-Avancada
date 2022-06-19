import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Theme import
import { GlobalStyle } from "./styles/global";

// Page import
import Home from "./pages/Home";
import Admin from "./pages/Admin";

// eslint-disable-next-line react/function-component-definition
const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Router>
  </>
);

export default App;
