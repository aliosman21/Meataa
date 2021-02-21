import React, { useState, useEffect } from "react";

import serverURL from "../Utils/global";
import Contact from "../components/contact";
import "../styles/MyEvents.css";
import Banner from "../components/banner";
import JsonData from "../data/data.json";
import axios from "axios";
import Cookies from "js-cookie";

export default function MyEvent() {
   return (
      <div className="eventsHolder">
         <div className="eventsTable">table here</div>
      </div>
   );
}
