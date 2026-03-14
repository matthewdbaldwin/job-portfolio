// src/components/Footer.jsx
import React, { Component } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaChevronUp,
} from "react-icons/fa";

const ICONS = {
  linkedin: FaLinkedin,
  github: FaGithub,
  website: FaGlobe,
  email: FaEnvelope,
};

export default class Footer extends Component {
  render() {
    const resumeData = this.props.resumeData || { socialLinks: [], address: "" };
    const year = new Date().getFullYear();

    return (
      <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="social-links" role="list">
              {(resumeData.socialLinks || []).map((item, i) => {
                const key = (item.id || item.name || "").toLowerCase();
                const Icon = ICONS[key] || FaGlobe;
                // if someone adds an email without mailto:
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
                      aria-label={item.name || key || "social"}
                      title={item.name || key}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div id="go-top">
            <a
              className="smoothscroll"
              title="Back to Top"
              href="#home"
              aria-label="Back to top"
            >
              <FaChevronUp aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="row">
          <div className="twelve columns">
            <p className="copyright">
              © {year} Matthew Baldwin — {resumeData.address}
            </p>
            <p className="privacy">
              No cookies or data are collected on this site. Do not sell my data.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
