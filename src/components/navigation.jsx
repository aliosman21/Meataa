import React,{useContext} from "react";
import {Link} from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { HashLink as Hash } from 'react-router-hash-link';
import {login} from "../Utils/loginUtil"
import "../styles/navigation.css" 
export function Navigation(){

  const {user,setUser} = useContext(UserContext);

  const loginHandler = async (e) =>{
   // e.preventDefault();
    //will call login Util
    console.log(e);
    const user = await login();
    setUser(user);


  } 

  const logoutHandler = async (e) =>{
   // e.preventDefault();
    //will call login Util
    console.log(e);

    setUser(null);


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
            <Link className="navbar-brand page-scroll logo-anchor" to="/">
                <img src="img/logo.png" alt="logo" className="logo"/>
            </Link>{" "}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Hash to="/#features" className="page-scroll">
                  أصنع الفارق 
                </Hash>
              </li>
              <li>
                <Hash to="/#about" className="page-scroll">
                  من نحن
                </Hash>
              </li>

              <li>
                <Hash to="/#portfolio" className="page-scroll">
                  الأعمال
                </Hash>
              </li>
              <li>
                <Hash to="/#team" className="page-scroll">
                  تعرف علينا
                </Hash>
              </li>
              <li>
                <Hash to="/#contact" className="page-scroll">
                  تواصل معنا
                </Hash>
              </li>

            {user? (
             <>
               <li><Link   to="/"className="page-scroll"  >
                  بحث
                </Link></li>
            <li>
                <a href="#!" className="page-scroll dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                 {user.username}
                </a>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <Link className="dropdown-item" to="/profile"> <p className="text-right ">حسابي </p></Link>
                      <a className="dropdown-item"  href="/" onClick={(e)=>loginHandler(e)}> <p className="text-right">تسجيل الخروج </p>
                      </a>
                    </div>
              </li>
            
              </>

              ):
              <>
            <li>
                <Link   to="/"/*to="/login"*/ className="page-scroll" onClick={(e)=>loginHandler(e)} >
                  تسجيل الدخول
                </Link>
              </li>
              <li>
                <Link to="/Register" className="page-scroll">
                  انضم لنا
                </Link>
              </li> </>
              }
            </ul>

          </div>
        </div>
      </nav>
 
    );
  
}

export default Navigation;
