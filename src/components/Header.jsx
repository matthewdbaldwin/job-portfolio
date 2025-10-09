import React, { useEffect, useMemo, useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaAngleDown,
} from "react-icons/fa";

const ICONS = {
  linkedin: FaLinkedin,
  github: FaGithub,
  website: FaGlobe,
  email: FaEnvelope,
};

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Work" },
  { id: "resume", label: "Resume" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Header({ resumeData = {} }) {
  const [activeSection, setActiveSection] = useState("home");
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const socialLinks = useMemo(() => resumeData.socialLinks || [], [resumeData]);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.15, 0.45],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  const handleNavClick = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    smoothScrollTo(id);
  };

  const handleCtaClick = (id) => () => {
    setMenuOpen(false);
    smoothScrollTo(id);
  };

  const navClasses = [navSolid && "opaque", menuOpen && "open"]
    .filter(Boolean)
    .join(" ");

  return (
    <header id="home">
      <nav id="nav-wrap" className={navClasses}>
        <button
          type="button"
          className="mobile-btn"
          aria-expanded={menuOpen}
          aria-controls="nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="mobile-btn__label sr-only">
            {menuOpen ? "Close" : "Menu"}
          </span>
          <span aria-hidden="true" className="mobile-btn__icon" />
        </button>

        <ul id="nav" className="nav">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id} className={activeSection === id ? "current" : ""}>
              <a href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="row banner">
        <div className="banner-text">
          {resumeData.role && <p className="hero-eyebrow">{resumeData.role}</p>}
          <h1 className="responsive-headline">{resumeData.name || ""}</h1>
          {resumeData.roleDescription && (
            <p className="hero-lede">{resumeData.roleDescription}</p>
          )}

          <div className="hero-actions" role="group" aria-label="Primary actions">
            <button
              type="button"
              className="hero-button hero-button--primary"
              onClick={handleCtaClick("portfolio")}
            >
              View Portfolio
            </button>
            <button
              type="button"
              className="hero-button hero-button--ghost"
              onClick={handleCtaClick("contact")}
            >
              Let’s Collaborate
            </button>
          </div>

          <ul className="social">
            {socialLinks.map((item, i) => {
              const key = (item.id || item.name || "").toLowerCase();
              const Icon = ICONS[key] || FaGlobe;
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
                    aria-label={item.name || key || "social link"}
                    title={item.name || key}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="scrolldown">
        <a href="#about" aria-label="Scroll to About" onClick={(e) => handleNavClick(e, "about")}>
          <FaAngleDown aria-hidden="true" />
        </a>
      </p>
    </header>
  );
}
