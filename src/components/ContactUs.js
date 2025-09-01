import React, { Component } from 'react';

export default class ContactUs extends Component {

  render() {
    const resumeData = this.props.resumeData || {
      socialLinks: [{ url: '#' }],
      linkedinId: 'LinkedIn'
    };
    const socialLinkURL = resumeData.socialLinks?.[0] || { url: '#' };

    return (
      <section id="contact">
        <div className="row section-head">
          <div className="ten columns">
            <p className="lead">
              If you feel the need to contact me, please use <a
                  href={socialLinkURL.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >LinkedIn</a>.
            </p>
          </div>
        </div>
      </section>
    );
  }
}
