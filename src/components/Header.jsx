import React, { Component } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaAngleDown,
} from "react-icons/fa";

const ICONS = {
  linkedin: FaLinkedin,
  github: FaGithub,
  website: FaGlobe,
  email: FaEnvelope,
};

export default class Header extends Component {
  render() {
    const resumeData = this.props.resumeData || {};

    return (
      <>
        <header id="home">
          <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
              Show navigation
            </a>
            <a className="mobile-btn" href="#nav" title="Hide navigation">
              Hide navigation
            </a>

            <ul id="nav" className="nav">
              <li className="current">
                <a className="smoothscroll" href="#home">Home</a>
              </li>
              <li><a className="smoothscroll" href="#about">About</a></li>
              <li><a className="smoothscroll" href="#portfolio">Works</a></li>
              <li><a className="smoothscroll" href="#resume">Resume</a></li>
              <li><a className="smoothscroll" href="#testimonials">Testimonials</a></li>
              <li><a className="smoothscroll" href="#contact">Contact</a></li>
            </ul>
          </nav>

          <div className="row banner">
            <div className="banner-text">
              <h1 className="responsive-headline">I am {resumeData.name}.</h1>
              <h2 style={{ color: "#fff", fontFamily: "Arial" }}>
                {resumeData.role}
              </h2>
              <h3 style={{ color: "#fff", fontFamily: "Arial" }}>
                {resumeData.roleDescription}
              </h3>

              <hr />

              <ul className="social">
                {(resumeData.socialLinks || []).map((item, i) => {
                  const key = (item.id || item.name || "").toLowerCase();
                  const Icon = ICONS[key] || FaGlobe;
                  const href =
                    key === "email" && item.url && !/^mailto:/i.test(item.url)
                      ? `mailto:${item.url}`
                      : item.url;

                  return (
                    <li key={item.id || i}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.name || key || "social link"}
                        title={item.name || key}
                      >
                        <Icon aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <p className="scrolldown">
            <a className="smoothscroll" href="#about" aria-label="Scroll to About">
              <FaAngleDown aria-hidden="true" />
            </a>
          </p>
        </header>
      </>
    );
  }
}
