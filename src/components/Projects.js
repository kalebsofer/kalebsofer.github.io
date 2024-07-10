import React, { Component } from "react";

class Projects extends Component {
  render() {
    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.projects;
      var projects = this.props.resumeProjects.map(function (project) {
        return (
          <div
            className="col-sm-12 col-md-6 col-lg-4"
            key={project.title}
            style={{ cursor: "pointer" }}
          >
            <span className="portfolio-item d-block">
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="foto">
                <div>
                  <img
                    src={project.images[0]}
                    alt="projectImages"
                    height="230"
                    style={{ marginBottom: 0, paddingBottom: 0, position: 'relative' }}
                  />
                  <span className="project-date">{project.startDate}</span>
                  <br />
                  <p className="project-title-settings mt-3">
                    {project.title}
                  </p>
                </div>
              </a>
            </span>
          </div>
        );
      });
    }

    return (
      <section id="portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projects}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default Projects;
