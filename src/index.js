import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Nav from "./components/navigation";
import Routes from "./Routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";

//import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
   <>
      <Router>
         <Nav />
         <Routes />
      </Router>
   </>,
   document.getElementById("root")
);
