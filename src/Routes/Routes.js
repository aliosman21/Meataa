import React, { useMemo, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import App from "../views/App";
import Profile from "../views/Profile";
import Login from "../views/Login";
import Register from "../views/Register";
import Navigation from "../components/navigation";
import Search from "../views/Search";

function Routes() {
   const [user, setUser] = useState(null);
   const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
   return (
      <>
         <Router>
            <UserContext.Provider value={providerUser}>
               <Route component={Navigation} />
               <Route exact path="/" component={App} />
               <Route exact path="/profile" component={Profile} />
               <Route exact path="/login" component={Login} />
               <Route exact path="/Register" component={Register} />
               <Route exact path="/Search" component={Search} />
            </UserContext.Provider>
         </Router>
      </>
   );
}

export default Routes;
