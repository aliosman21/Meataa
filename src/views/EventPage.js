import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function Profile(props) {
   const [count, setCount] = useState(0);
   const { id } = props.match.params;
   // Similar to componentDidMount and componentDidUpdate:
   console.log(id);

   return <h1>yo</h1>;
}
