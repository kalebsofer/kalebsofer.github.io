import React, { Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";

class Experience extends Component {
  render() {
    if (this.props.resumeExperience && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.experience;
      var work = this.props.resumeExperience.map(function (work, i) {
        const technologies = work.technologies;
        const mainTechnologies = work.mainTech;

        var mainTech = mainTechnologies.map((technology, i) => {
          return (
            <Badge pill className="main-badge mr-2 mb-2" key={i}>
              {technology}
            </Badge>
          );
        });
        var tech = technologies.map((technology, i) => {
          return (
            <Badge pill className="experience-badge mr-2 mb-2" key={i}>
              {technology}
            </Badge>
          );
        });
        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
                contentStyle={{ background: '#fff', color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid #fff' }}
            date={work.years}
                iconStyle={{ background: '#fff', color: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                icon={
                    i === 0 ? <img src={process.env.PUBLIC_URL + '/images/portfolio/experience/mojlogo.png'} alt="icon" style={{ width: '50%', height: '50%', objectFit: 'cover', borderRadius: '50%' }} /> :
                    i === 1 ? <img src={process.env.PUBLIC_URL + '/images/portfolio/experience/mojlogo.png'} alt="icon" style={{ width: '50%', height: '50%', objectFit: 'cover', borderRadius: '50%' }} /> :
                      i === 2 ? <img src={process.env.PUBLIC_URL + '/images/portfolio/experience/santanderlogo.png'} alt="icon" style={{ width: '50%', height: '50%', objectFit: 'cover', borderRadius: '50%' }} /> :
                        <img src={process.env.PUBLIC_URL + '/images/portfolio/experience/delilogo.png'} alt="icon" style={{ width: '50%', height: '50%', objectFit: 'cover', borderRadius: '50%' }} />
                }
            key={i}
          >
            <div style={{ textAlign: "left", marginBottom: "4px" }}>
              {mainTech}
                </div>
            <h3
              className="vertical-timeline-element-title"
              style={{ textAlign: "left" }}
            >
              {work.title}
            </h3>
            <h4
              className="vertical-timeline-element-subtitle"
              style={{ textAlign: "left" }}
            >
              {work.company}
            </h4>
            <div style={{ textAlign: "left", marginTop: "15px" }}>{tech}</div>
          </VerticalTimelineElement>
        );
      });
    }

    return (
      <section id="resume" className="pb-5">
        <div className="col-md-12 mx-auto">
          <div className="col-md-12">
            <h1 className="section-title" style={{ color: "black" }}>
              <span className="text-black" style={{ textAlign: "center" }}>
                {sectionName}
              </span>
            </h1>
          </div>
        </div>
        <div className="col-md-8 mx-auto">
                <VerticalTimeline>
            {work}
            <VerticalTimelineElement
                        iconStyle={{
                            background: 'rgb(16, 204, 82)',
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        icon={<i className="fas fa-sun experience-icon" style={{ fontSize: '34px', marginTop: '2px' }}></i>}
            />
                </VerticalTimeline>

        </div>
      </section>
    );
  }
}

export default Experience;
