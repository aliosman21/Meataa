import React from "react";
import { Route, Switch } from "react-router-dom";
import { MDBContainer } from "mdbreact";
import App from "../views/App";
import Nav from "../components/NavBar";
import Profile from "../views/Profile";

function Routes() {
   return (
      <>
         <Nav />
         <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/profile" component={Profile} />
         </Switch>
      </>
   );
}

export default Routes;
