import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import App from "./views/App";
import Nav from "./components/NavBar";
//import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
   <div id="mainRenderingComponent">
      <Nav />
      <App />
   </div>,
   document.getElementById("root")
);
