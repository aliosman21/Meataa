import Cookies from "js-cookie";

export const login = async () => {
   Cookies.set("session", { id: 3, username: "ali", email: "ali97@gmail.com", userType: 0 });
   return {
      //this should go to database and return a user
      id: 3,
      username: "ali",
      email: "ali97@gmail.com",
      userType: 0,
   };
};
