import React from "react";
import Fade from "react-reveal/Fade";

const About = ({ sharedBasicInfo, resumeBasicInfo }) => {
  if (!resumeBasicInfo) return null;

  const { section_name: { about: sectionName } = {}, description_parts: descriptions = [] } = resumeBasicInfo;

  return (
    <section id="about" className="about-section">
      <div className="col-md-12">
        <h1 className="section-title">
          <span>{sectionName}</span>
        </h1>
        <div className="row center mx-auto mb-5">
          <div className="col-md-4 mb-5 center">
            <div className="circular-profile">
              <span style={{ cursor: "auto" }}>
                <img
                  src={sharedBasicInfo ? `images/${sharedBasicInfo.image}` : ""}
                  alt="Avatar placeholder"
                  className="profile-image"
                />
              </span>
            </div>
          </div>
          <div className="col-md-8 center">
            <div className="col-md-10">
              {descriptions.map((item, index) => (
                <Fade bottom key={index}>
                  <p className="about-description">
                    {item}
                  </p>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
