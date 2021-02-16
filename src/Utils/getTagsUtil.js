import axios from "axios";

export const getTags = async () => {
   const responseData = await axios.get("http://127.0.0.2/tags/list");

   //console.log(responseData.data.message);
   return responseData.data.message;
};
