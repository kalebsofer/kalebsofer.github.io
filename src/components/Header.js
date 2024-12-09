import React, { Component } from "react";
import Typical from "react-typical";
import Switch from "react-switch";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-scroll";
import Fade from "react-reveal/Fade";

class Header extends Component {
  titles = [];

  constructor() {
    super();
    this.state = { checked: false, menuOpen: false };
    this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  onThemeSwitchChange(checked) {
    this.setState({ checked });
    this.props.toggleTheme();
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  }

  render() {
    if (this.props.sharedData) {
      var name = this.props.sharedData.name;
      this.titles = this.props.sharedData.titles.map(x => [ x.toUpperCase(), 1500 ] ).flat();
    }

    const HeaderTitleTypeAnimation = React.memo(() => {
      return <Typical className="title-styles" steps={this.titles} loop={50} />
    }, (props, prevProp) => true);
    
    const { menuItems, isDarkTheme, resumeBasicInfo } = this.props;

    const descriptions = resumeBasicInfo?.description_parts || [];

    return (
      <header id="header-top" style={{ display: 'block' }}>
        {/* Language selector block */}
        <div 
          className="col-md-12 mx-auto text-center language" 
          style={{
            position: 'absolute', 
            top: '0vh', 
            height: '5vh',
            zIndex: "1",
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={() =>
              this.props.applyPickedLanguage(
                window.$primaryLanguage,
                window.$secondaryLanguageIconId
              )
            }
            style={{ display: "inline" , fontSize: "1.5rem", paddingTop: "0.5vh"}}
          >
            <span
              className="iconify language-icon mr-5"
              data-icon="twemoji-flag-for-flag-united-kingdom"
              data-inline="false"
              id={window.$primaryLanguageIconId}
            ></span>
          </div>
          <div
            onClick={() =>
              this.props.applyPickedLanguage(
                window.$secondaryLanguage,
                window.$primaryLanguageIconId
              )
            }
            style={{ display: "inline" , fontSize: "1.5rem", paddingTop: "0.5vh"}}
          >
            <span
              className="iconify language-icon"
              data-icon="twemoji-flag-for-flag-spain"
              data-inline="false"
              id={window.$secondaryLanguageIconId}
            ></span>
          </div>
        </div>
        {/* Main content */}
        <div id="home" style={{ display: 'block' }}>
          {/* Parent div for the title and job title */}
          <div className="header-title-wrapper">
            <h1 className="mb-0">
              <Typical steps={[name]} wrapper="p" />
            </h1>
            <div className="title-container">
              <HeaderTitleTypeAnimation />
            </div>
          </div>
          {/* Profile picture element */}
          <div className="header-profile-pic">
            <img
              src={this.props.sharedData ? `images/${this.props.sharedData.image}` : ""}
              alt="Profile Picture"
              className="profile-circle"
            />
          </div>
          <div className="profile-description">
            {descriptions.map((item, index) => (
              <Fade bottom key={index}>
                <p 
                  style={{ color: 'black', fontFamily: "'Indie Flower', cursive", fontSize: "1.5rem" }}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              </Fade>
            ))}
          </div>
          <div className="row-aligner" style={{ height: '100%'}}>
            <div>
              <div className="theme-switch-container">
                <Switch
                  checked={this.state.checked}
                  onChange={this.onThemeSwitchChange}
                  offColor="#baaa80"
                  onColor="#353535"
                  className="react-switch mx-auto"
                  uncheckedIcon={
                    <span
                      className="iconify theme-switch-icon unchecked-icon"
                      data-icon="twemoji:owl"
                      data-inline="false"
                    ></span>
                  }
                  checkedIcon={
                    <span
                      className="iconify theme-switch-icon checked-icon"
                      data-icon="noto-v1:sun-with-face"
                      data-inline="false"
                    ></span>
                  }
                  id="icon-switch"
                />
              </div>
              <Menu
                right
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleStateChange(state)}
                customBurgerIcon={false}
                customCrossIcon={false}
              >
                <Link className="menu-item" to="skills" smooth={true} duration={500}>{menuItems.skills}</Link>
                <Link className="menu-item" to="resume" smooth={true} duration={500}>{menuItems.experience}</Link>
                <Link className="menu-item" to="portfolio" smooth={true} duration={500}>{menuItems.projects}</Link>
                <a className="menu-item" href="/docs/KSoferCV.pdf" download>{menuItems.cv}</a>
              </Menu>
              <div
                className={`bm-burger-button ${this.state.menuOpen ? 'open' : ''} ${isDarkTheme ? 'dark-theme' : ''}`}
                onClick={this.toggleMenu}
              >
                <span className="iconify" data-icon={this.state.menuOpen ? "mdi:close" : "mdi:menu"} data-inline="false"></span>
              </div>
              <div
                className={`bm-cross-button ${this.state.menuOpen ? 'visible' : 'hidden'}`}
                onClick={this.toggleMenu}
              >
                <span className="iconify" data-icon="mdi:close" data-inline="false"></span>
              </div>
              <div className="more-here-container">
                <p className="more-here-text">
                  more below <span className="arrow">&#8595;</span>
                </p> 
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
