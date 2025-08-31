import React from 'react';

export default function About({ resumeData = {} }) {
  const { name, address, website, aboutme, aboutme2, aboutme3 } = resumeData;
  const about = [aboutme, aboutme2, aboutme3].filter(Boolean);

  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          <img
            className="profile-pic"
            src="images/profilepic.webp"
            alt={name ? `Profile picture of ${name}` : 'Profile picture'}
            loading="lazy"
          />
        </div>

        <div className="nine columns main-col">
          <h2>About Me</h2>
          {about.map((text, i) => (
            <p key={i}>{text}</p>
          ))}

          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <address className="address">
                {name && <span>{name}</span>}
                <br />
                {address && <span>{address}</span>}
                <br />
                {website && (
                  <span>
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {website}
                    </a>
                  </span>
                )}
              </address>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}