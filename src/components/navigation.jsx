import React,{useContext} from "react";
import { UserContext } from "../context/UserContext";
import {login} from "../Utils/loginUtil"
export function Navigation(){

  const {user,setUser} = useContext(UserContext);

  const loginHandler = async (e) =>{
    //will call login Util
    console.log(e);
    //const user = await login();
    //setUser(user);


  } 



    return (
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <a className="navbar-brand page-scroll" href="/">
              لوجو
            </a>{" "}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#features" className="page-scroll">
                  أصنع الفارق 
                </a>
              </li>
              <li>
                <a href="#about" className="page-scroll">
                  من نحن
                </a>
              </li>

              <li>
                <a href="#portfolio" className="page-scroll">
                  الأعمال
                </a>
              </li>
              <li>
                <a href="#team" className="page-scroll">
                  تعرف علينا
                </a>
              </li>
              <li>
                <a href="#contact" className="page-scroll">
                  تواصل معنا
                </a>
              </li>

            {user? (<li>
                <a href="#!" className="page-scroll dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                 {user.username}
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a className="dropdown-item" href="#!"> <p className="text-right ">حسابي </p></a>
                  <a className="dropdown-item"  href="#!"> <p className="text-right">تسجيل الخروج </p></a>
                </div>
              </li>):
              <>
            <li>
                <a href="/Login" className="page-scroll" onClick={(e)=>loginHandler(e)} >
                  تسجيل الدخول
                </a>
              </li>
              <li>
                <a href="#!" className="page-scroll">
                  انضم لنا
                </a>
              </li> </>
              }
            </ul>

          </div>
        </div>
      </nav>
    );
  
}

export default Navigation;
