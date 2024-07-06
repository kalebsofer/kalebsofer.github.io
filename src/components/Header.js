import React, { Component } from "react";
import Typical from "react-typical";
import Switch from "react-switch";
import { slide as Menu } from "react-burger-menu";
import '../App.scss';

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
    this.setTheme();
  }

  setTheme() {
    var dataThemeAttribute = "data-theme";
    var body = document.body;
    var newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
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

    const HeaderTitleTypeAnimation = React.memo( () => {
      return <Typical className="title-styles" steps={this.titles} loop={50} />
    }, (props, prevProp) => true);

    return (
      <header id="home" style={{ height: window.innerHeight - 140, display: 'block' }}>
        <div className="row aligner" style={{height: '100%'}}>
          <div className="col-md-12">
            <div>
              <span className="iconify header-icon" data-icon="la:laptop-code" data-inline="false"></span>
              <br/>
              <h1 className="mb-0">
                <Typical steps={[name]} wrapper="p" />
              </h1>
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>
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
              <Menu
                right
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleStateChange(state)}
                customBurgerIcon={false}
                customCrossIcon={false}
              // width={'300px'}
              // styles={{
              //   bmMenuWrap: {
              //     top: '0px',
              //     height: 'auto' // Adjusts height based on content
              //   },
              //   bmOverlay: {
              //     top: 0,
              //     left: 0,
              //     right: 0,
              //     bottom: 0,
              //     position: 'fixed'
              //   }
              // }}
              >
                <a className="menu-item" href="#about">About Me</a>
                <a className="menu-item" href="#skills">Stack</a>
                <a className="menu-item" href="#experience">Experience</a>
                <a className="menu-item" href="#projects">Projects</a>
                <a className="menu-item" href="/docs/KSoferCV.pdf" download>CV</a>
              </Menu>
              <div className={`burger-button ${this.state.menuOpen ? 'open' : ''}`} onClick={this.toggleMenu} style={{ transform: this.state.menuOpen ? 'translateX(-300px)' : 'translateX(0)' }}>
                <span className="iconify" data-icon="mdi:menu" data-inline="false"></span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
