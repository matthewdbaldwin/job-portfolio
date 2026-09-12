import React from 'react';

export default function About({ resumeData = {} }) {
  const { name, address, website, aboutme, aboutme2, aboutme3 } = resumeData;

  // Normalize everything into an array of strings
  const about = [
    ...(Array.isArray(aboutme) ? aboutme : aboutme ? [aboutme] : []),
    ...(aboutme2 ? [aboutme2] : []),
    ...(aboutme3 ? [aboutme3] : []),
  ];

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

          {about.map((text, i) => {
            // If it's a bullet line (starts with •), render as a list item
            if (text.trim().startsWith("•")) {
              return (
                <ul key={`list-${i}`} className="about-list">
                  <li>{text.replace("•", "").trim()}</li>
                </ul>
              );
            }
            // Otherwise, render as a paragraph
            return <p key={i}>{text}</p>;
          })}

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
