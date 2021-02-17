import React from "react";
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';
import "../styles/navigation.css" 
export function Navigation(){


  const logoutHandler = async (e) =>{
   // e.preventDefault();
    //will call login Util
    console.log(e);
    Cookies.remove('session');


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

            {Cookies.getJSON('session')?(
             <>
               <li><Link   to="/search" className="page-scroll text-right"  >
                  بحث
                </Link></li>

                      {Cookies.getJSON('session').type === "Organization"?(
                        <li>
                        <Link className="dropdown-item" to="/newEvent"> <p className="text-right ">عمل جديد</p></Link>
                        </li>
                      ):(<></>)}
                      <li>
                      <Link className="dropdown-item" to="/profile"> <p className="text-right ">{Cookies.getJSON('session').name}</p></Link>
                      </li>
                      <li>
                      <Link className="dropdown-item"  to="/" onClick={(e)=>logoutHandler(e)}> <p className="text-right">تسجيل الخروج </p>
                      </Link>
                      </li>
            
              </>

              ):
              <>
            <li>
                <Link to="/login" className="page-scroll">
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
