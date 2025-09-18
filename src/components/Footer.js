import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    let resumeData = this.props.resumeData || { socialLinks: [] };
    const year = new Date().getFullYear();

    return (
      <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="social-links">
              {resumeData.socialLinks && resumeData.socialLinks.map((item, i) => (
                <li key={i}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.name || 'social'}>
                    <i className={item.className}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div id="go-top">
            <a className="smoothscroll" title="Back to Top" href="#home" aria-label="Back to top">
              <i className="icon-up-open" />
            </a>
          </div>
        </div>

        <div className="row">
          <div className="twelve columns">
            <ul className="copyright">
              <li>© {year} Matthew Baldwin — {resumeData?.address}</li>
              <li>No cookies or data are collected on this site.</li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}
