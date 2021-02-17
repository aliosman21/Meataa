import axios from "axios";
import serverURL from "../Utils/global";

export const getTags = async () => {
   const responseData = await axios.get(serverURL + "/tags/list");

   //console.log(responseData.data.message);
   return responseData.data.message;
};
