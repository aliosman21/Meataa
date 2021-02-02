import React from "react";

export function Navigation(){

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
            <a className="navbar-brand page-scroll" href="#page-top">
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
              <li>
                <a href="#!" className="page-scroll" >
                  تسجيل الدخول
                </a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    );
  
}

export default Navigation;
