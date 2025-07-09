import React, { Component } from 'react';
export default class Footer extends Component {
  render() {
    let resumeData = this.props.resumeData;
    return (
      <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="social-links">
              {
                resumeData.socialLinks && resumeData.socialLinks.map((item)=>{
                  return(
                    <li key={item.id}>
                      <a href={item.url}>
                      <i className={item.className} />
                      </a>
                    </li>
                  )
                })
              }
            </ul>
            
          </div>
          <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open" /></a></div>
        </div>
        <div className="row">
          <div className="twelve columns">
              <p>Copyright Matthew Baldwin <script>document.write(new Date().getFullYear())</script>
              </p>
              <p>No cookies or data are collected on this site.</p>
          </div>
        </div>
      </footer>
    );
  }
}