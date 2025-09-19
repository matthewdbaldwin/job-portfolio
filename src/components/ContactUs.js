import React, { Component } from 'react';

export default class ContactUs extends Component {
  render() {
    let resumeData = this.props.resumeData || {};
    const linkedin = resumeData.socialLinks?.find((s) => s.name === 'linkedin');
    const github   = resumeData.socialLinks?.find((s) => s.name === 'github');

    return (
      <section id="contact">
        <div className="row section-head">
          <div className="twelve columns">
            <h1><span>Let’s Connect</span></h1>
            <p className="lead">
              Let’s Talk About How I Can Strengthen Your Marketing Ops & Brand Strategy.
            </p>

            <ul className="contact-links">
              {linkedin && (
                <li>
                  <a href={linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className={linkedin.className}></i> LinkedIn
                  </a>
                </li>
              )}
              {github && (
                <li>
                  <a href={github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className={github.className}></i> GitHub
                  </a>
                </li>
              )}
              {resumeData.linkedinId && (
                <li>
                  <a href={`mailto:${resumeData.linkedinId}@gmail.com`} aria-label="Email">✉ Email Me</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
