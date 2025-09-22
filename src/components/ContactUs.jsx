import React, { Component } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default class ContactUs extends Component {
  render() {
    const resumeData = this.props.resumeData || {};
    const links = resumeData.socialLinks || [];
    const linkedin = links.find(
      (s) => (s.id || s.name || "").toLowerCase() === "linkedin"
    );
    const github = links.find(
      (s) => (s.id || s.name || "").toLowerCase() === "github"
    );

    // Prefer an explicit email on resumeData for reliability
    const email =
      resumeData.email ||
      (resumeData.linkedinId ? `${resumeData.linkedinId}@gmail.com` : null);

    return (
      <section id="contact">
        <div className="row section-head">
          <div className="twelve columns">
            <h1><span>Let’s Connect</span></h1>
            <p className="lead">
              Let’s talk about how I can strengthen your marketing ops & brand strategy.
            </p>

            <ul className="contact-links">
              {linkedin && (
                <li>
                  <a
                    href={linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin aria-hidden="true" /> LinkedIn
                  </a>
                </li>
              )}

              {github && (
                <li>
                  <a
                    href={github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <FaGithub aria-hidden="true" /> GitHub
                  </a>
                </li>
              )}

              {email && (
                <li>
                  <a href={`mailto:${email}`} aria-label="Email">
                    <FaEnvelope aria-hidden="true" /> Email Me
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
