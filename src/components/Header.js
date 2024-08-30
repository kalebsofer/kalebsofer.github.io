import React, { Component } from "react";
import Typical from "react-typical";
import Switch from "react-switch";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-scroll";
import PolaroidPicture from './PolaroidPicture'; // Import the new component


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

    const { menuItems, isDarkTheme } = this.props;

    return (
      <header id="home" style={{display: 'block' }}>
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
          <PolaroidPicture
            imageSrc={this.props.sharedData ? `images/${this.props.sharedData.image}` : ""}
            altText="Profile Picture"
            description="This is the back of the Polaroid with a handwritten description."
          />
        </div>
        <div className="row aligner" style={{height: '100%'}}>
          <div className="col-md-12">
            <div>
              <div className="theme-switch-container">
                <Switch
                  checked={this.state.checked}
                  onChange={this.onThemeSwitchChange}
                  offColor="#baaa80"
                  onColor="#353535"
                  className="react-switch mx-auto"
                  width={90}
                  height={40}
                  uncheckedIcon={
                    <span
                      className="iconify"
                      data-icon="twemoji:owl"
                      data-inline="false"
                      style={{
                        display: "block",
                        height: "100%",
                        fontSize: 25,
                        textAlign: "end",
                        marginLeft: "20px",
                        color: "#353239",
                      }}
                    ></span>
                  }
                  checkedIcon={
                    <span
                      className="iconify"
                      data-icon="noto-v1:sun-with-face"
                      data-inline="false"
                      style={{
                        display: "block",
                        height: "100%",
                        fontSize: 25,
                        textAlign: "end",
                        marginLeft: "10px",
                        color: "#353239",
                      }}
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
                <Link className="menu-item" to="about" smooth={true} duration={500}>{menuItems.about}</Link>
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
            </div>
          </div>
        </div>
      </header>
    );
  }  
}

export default Header;
