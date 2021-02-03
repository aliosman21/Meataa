import React, { useState } from "react";
import "../styles/profile.css";
export default function Profile() {
   const getAchievementsFromDatabase = () => {
      //will call database and fill the data object 4 reviews at atime

      let data = {
         1: { img: "sora", review: "rev1" },
         2: { img: "sora", review: "rev2" },
         3: { img: "sora", review: "rev3" },
         4: { img: "sora", review: "rev4" },
      };
      return data;
   };

   const [data, setData] = useState(() => getAchievementsFromDatabase());

   return (
      <div className="custom-content-profile">
         <div className="custom-container-profile col"></div>
         <div className="custom-container-achievements col">
            <div class="all-achievements">
               <div class="single-achievement darker">
                  <img src="/img/team/01.jpg" alt="Avatar" class="right" />
                  <p>{data[1].review}</p>
               </div>
               <div class="single-achievement darker">
                  <img src="/img/team/01.jpg" alt="Avatar" class="right" />
                  <p>{data[2].review}</p>
               </div>
               <div class="single-achievement darker">
                  <img src="/img/team/01.jpg" alt="Avatar" class="right" />
                  <p>{data[3].review}</p>
               </div>
               <div class="single-achievement darker">
                  <img src="/img/team/01.jpg" alt="Avatar" class="right" />
                  <p>{data[4].review}</p>
               </div>
               <button className="paging">Next</button>
            </div>
         </div>
      </div>
   );
}
