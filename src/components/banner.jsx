import React from "react";
import "../styles/banner.css"
export function Banner(props){


    return (

      <div id="topBanner" >
           <h1 id="bannerH1">
               {props.data.header}
           </h1>
      </div>
 
    );
  
}

export default Banner;
