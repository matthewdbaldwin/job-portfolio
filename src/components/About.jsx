import React from 'react';
import aboutData from '../data/about.js';

export default function About() {
  const { name, address, website, intro, bulletPoints, closing } = aboutData;

  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          <img
            className="profile-pic"
            src="images/profilepic.webp"
            alt={name ? `Profile picture of ${name}` : 'Profile picture'}
            width="460"
            height="460"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="nine columns main-col">
          <h2>About Me</h2>

          {intro.map((text, i) => (
            <p key={`intro-${i}`}>{text}</p>
          ))}

          {bulletPoints.length > 0 && (
            <ul className="about-list">
              {bulletPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}

          {closing.map((text, i) => (
            <p key={`closing-${i}`}>{text}</p>
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
