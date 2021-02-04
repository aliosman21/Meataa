import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/search.css";

export default function Profile() {
   const { user, setUser } = useContext(UserContext);
   return user ? (
      <div className="custom-search-content">
         <h1>HELLO</h1>
      </div>
   ) : (
      //404 page
      <div></div>
   );
}
