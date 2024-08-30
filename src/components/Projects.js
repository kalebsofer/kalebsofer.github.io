import React, { Component } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

class Projects extends Component {
  render() {
    let sectionName;
    let projects = [];

    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      sectionName = this.props.resumeBasicInfo.section_name.projects;
      projects = this.props.resumeProjects.map(function (project) {
        return (
          <div
            className="portfolio-item"
            key={project.title}
            style={{ cursor: "pointer" }}
          >
            <span className="d-block">
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="foto">
                <div>
                  <img
                    src={project.images[0]}
                    alt="projectImages"
                    className="portfolio-img"
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
            {projects.length > 0 ? (
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              >
                <Masonry gutter="15px">
                  {projects}
                </Masonry>
              </ResponsiveMasonry>
            ) : (
              <p>No projects available at the moment.</p> // Fallback UI
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Projects;
