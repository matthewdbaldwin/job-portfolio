import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import contactData from "../data/contact.js";

const ICONS = {
  linkedin: FaLinkedin,
  github: FaGithub,
  email: FaEnvelope,
};

const isExternal = (url) => /^https?:/i.test(url);

export default function ContactUs() {
  const { headline, message, links } = contactData;

  return (
    <section id="contact">
      <div className="row section-head">
        <div className="twelve columns">
          <h1>
            <span>{headline}</span>
          </h1>
          <p className="lead">{message}</p>

          <ul className="contact-links">
            {links.map((link) => {
              const Icon = ICONS[link.id] || FaLinkedin;
              const external = isExternal(link.url);

              return (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                  >
                    <Icon aria-hidden="true" /> {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
