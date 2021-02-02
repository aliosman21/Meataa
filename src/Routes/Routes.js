import React, { useMemo, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import App from "../views/App";
import Profile from "../views/Profile";
import Login from "../views/Login";
import Navigation from "../components/navigation";

function Routes() {
   const [user, setUser] = useState(null);
   const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
   return (
      <>
         <Switch>
            <UserContext.Provider value={providerUser}>
               <Route component={Navigation} />
               <Route exact path="/" component={App} />
               <Route exact path="/profile" component={Profile} />
               <Route exact path="/login" component={Login} />
            </UserContext.Provider>
         </Switch>
      </>
   );
}

export default Routes;
