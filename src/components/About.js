import React, { Component } from "react";

class About extends Component {
  render() {
    if (this.props.sharedBasicInfo) {
      var profilepic = "images/" + this.props.sharedBasicInfo.image;
    }
    if (this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.about;
      var hello = this.props.resumeBasicInfo.description_header;
      var about = this.props.resumeBasicInfo.description;
    } else {
      var sectionName = '';
      var hello = '';
      var about = '';
    }

    return (
      <section id="about" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <div className="col-md-12">
          <h1 style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="row center mx-auto mb-5">
            <div className="col-md-4 mb-5 center">
              <div className="circular-profile">
                <span style={{ cursor: "auto" }}>
                  <img
                    width="300px"
                    height="300px"
                    src={profilepic}
                    alt="Avatar placeholder"
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </span>
              </div>
            </div>

            <div className="col-md-8 center">
              <div className="col-md-10">
                <div
                  className="text-justify ml-3 mr-3"
                  style={{
                    fontSize: "150%",
                    lineHeight: "200%",
                  }}
                >
                  {about.split('\n').map((item, index) => (
                    <p key={index}>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
