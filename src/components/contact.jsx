import React, { Component } from "react";
import "../styles/footer.css"
export class Contact extends Component {
  render() {
    return (
      <div>
        <div id="contact" className="custom-contact">
          <div className="container">
            <div className="col-md-3 col-md-offset-1 contact-info">
              <div className="contact-item">
                <h3>كيف تصل لنا</h3>
                <p>
                  <span>
                    <i className="fa fa-map-marker"></i> العنوان
                  </span>
                  {this.props.data ? this.props.data.address : "loading"}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-phone"></i> رقم الهاتف
                  </span>{" "}
                  {this.props.data ? this.props.data.phone : "loading"}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>

                    <i className="fa fa-envelope-o"></i> البريد الالكتروني
                  </span>{" "}
                  {this.props.data ? this.props.data.email : "loading"}
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
              
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
