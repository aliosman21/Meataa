import React, { useMemo, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import App from "../views/App";
import Profile from "../views/Profile";
import Login from "../views/Login";
import Register from "../views/Register";
import Navigation from "../components/navigation";
import Search from "../views/Search";
import MyEvents from "../views/MyEvents";
import AllJobs from "../views/allJobs";
import AllOrgs from "../views/AllOrganizations";
import addNewTag from "../views/addTags";
import EventVolunteer from "../views/eventVolunteer";
import AllVolunteers from "../views/AllVolunteers";
import ChangeInfo from "../views/InfoChange";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import NewEvent from "../views/NewEvent";

function Routes() {
   const [user, setUser] = useState(null);
   const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
   document.title = "معطاء";
   const options = {
      // you can also just use 'bottom center'
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: "50px",
      // you can also just use 'scale'
      transition: transitions.SCALE,
   };
   return (
      <>
         <Router>
            <UserContext.Provider value={providerUser}>
               <AlertProvider template={AlertTemplate} {...options}>
                  <Route component={Navigation} />
                  <Route exact path="/" component={App} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/AllVolunteers" component={AllVolunteers} />
                  <Route exact path="/EventVolunteer" component={EventVolunteer} />
                  <Route exact path="/Register" component={Register} />
                  <Route exact path="/allJobs" component={AllJobs} />
                  <Route exact path="/AllOrganizations" component={AllOrgs} />
                  <Route exact path="/Search" component={Search} />
                  <Route exact path="/addNewTag" component={addNewTag} />
                  <Route exact path="/MyEvents" component={MyEvents} />
                  <Route exact path="/setInfo" component={ChangeInfo} />
                  <Route exact path="/newEvent" component={NewEvent} />
               </AlertProvider>
            </UserContext.Provider>
         </Router>
      </>
   );
}

export default Routes;
