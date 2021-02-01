import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Routes from "./Routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";

//import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
   <div id="mainRenderingComponent">
      <Router>
         <Routes />
      </Router>
   </div>,
   document.getElementById("root")
);
