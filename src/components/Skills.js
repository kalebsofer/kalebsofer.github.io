import React, { Component } from "react";
// import tableauIcon from '../images/icons/tableau.svg';

class Skills extends Component {
  render() {
    if (this.props.sharedSkills && this.props.resumeBasicInfo) {
      const sectionName = this.props.resumeBasicInfo.section_name.skills;

      const categories = {
        "Data Engineering": [],
        "Machine Learning": [],
        "Cloud and Infra": [],
        "Data Visualization": [],
        "Project Management": []
      };

      this.props.sharedSkills.icons.forEach((skill) => {
        categories[skill.category].push(skill);
      });

      const renderSkills = (skills) => {
        return skills.map((skill, i) => (
          <li className="list-inline-item mx-3" key={i}>
            <span>
              <div className="text-center skills-tile">
                <i className={skill.class} style={{ fontSize: "220%" }}>
                  <p
                    className="text-center"
                    style={{ fontSize: "30%", marginTop: "4px" }}
                  >
                    {skill.name}
                  </p>
                </i>
              </div>
            </span>
          </li>
        ));
      };

      return (
        <section id="skills">
          <div className="col-md-12">
            <div className="col-md-12">
              <h1 className="section-title">
                <span className="text-white">{sectionName}</span>
              </h1>
            </div>
            <div className="col-md-12">
              {Object.keys(categories).map((category, index) => (
                <div key={index} className="skill-category">
                  <h3 className="category-title">{category}</h3>
                  <ul className="list-inline mx-auto skill-icon">
                    {renderSkills(categories[category])}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    return null;
  }
}

export default Skills;