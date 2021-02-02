import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "../views/App";
import Profile from "../views/Profile";

function Routes() {
   return (
      <>
         <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/profile" component={Profile} />
         </Switch>
      </>
   );
}

export default Routes;
