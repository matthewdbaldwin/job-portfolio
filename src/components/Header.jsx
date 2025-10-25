import React, { useEffect, useMemo, useRef, useState } from "react";
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

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

function useMatchMedia(query) {
  const getInitial = () => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getInitial);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Ensure the first paint is in sync even if matchMedia was resolved before mount.
    handleChange(mediaQueryList);

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", handleChange);
    } else {
      mediaQueryList.addListener(handleChange);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", handleChange);
      } else {
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}

const Header = ({ resumeData = {} }) => {
  const isMobile = useMatchMedia(MOBILE_MEDIA_QUERY);
  const [navOpen, setNavOpen] = useState(false);
  const [navOpaque, setNavOpaque] = useState(false);
  const ticking = useRef(false);
  const scrollRafId = useRef(null);

  const navClassName = useMemo(() => {
    const classes = [];
    if (navOpaque) classes.push("opaque");
    if (navOpen && isMobile) classes.push("open");
    return classes.join(" ");
  }, [isMobile, navOpen, navOpaque]);

  useEffect(() => {
    if (!navOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setNavOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navOpen]);

  useEffect(() => {
    if (!isMobile && navOpen) {
      setNavOpen(false);
    }
  }, [isMobile, navOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const shouldDisableScroll = navOpen && isMobile;
    document.body.classList.toggle("no-scroll", shouldDisableScroll);

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMobile, navOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncNavOpacity = () => {
      const makeOpaque = window.scrollY > 10;
      setNavOpaque((prev) => (prev === makeOpaque ? prev : makeOpaque));
      ticking.current = false;
    };

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      scrollRafId.current = window.requestAnimationFrame(syncNavOpacity);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollRafId.current !== null) {
        window.cancelAnimationFrame(scrollRafId.current);
        scrollRafId.current = null;
      }

      window.removeEventListener("scroll", handleScroll);
      ticking.current = false;
    };
  }, []);

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  const closeNav = () => {
    if (isMobile) {
      setNavOpen(false);
    }
  };

  return (
    <>
      <header id="home">
        <nav
          id="nav-wrap"
          className={navClassName}
          aria-expanded={isMobile ? navOpen : undefined}
          aria-label="Primary navigation"
        >
          {isMobile && (
            <button
              type="button"
              className="mobile-toggle"
              aria-expanded={navOpen}
              aria-controls="nav"
              aria-haspopup="true"
              aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={toggleNav}
            >
              <span className="mobile-toggle__bar" aria-hidden="true"></span>
              <span className="mobile-toggle__bar" aria-hidden="true"></span>
              <span className="mobile-toggle__bar" aria-hidden="true"></span>
            </button>
          )}

          <ul
            id="nav"
            className="nav"
            aria-hidden={isMobile ? !navOpen : undefined}
          >
            <li className="current">
              <a className="smoothscroll" href="#home" onClick={closeNav}>
                Home
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#about" onClick={closeNav}>
                About
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#portfolio" onClick={closeNav}>
                Works
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#resume" onClick={closeNav}>
                Resume
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#testimonials" onClick={closeNav}>
                Testimonials
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#contact" onClick={closeNav}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {navOpen && isMobile ? (
          <div className="nav-overlay" onClick={closeNav} aria-hidden="true" />
        ) : null}

        <div className="row banner">
          <div className="banner-text">
            <h1 className="responsive-headline">I am {resumeData.name}.</h1>
            <h2 style={{ color: "#fff", fontFamily: "Arial" }}>{resumeData.role}</h2>
            <h3 style={{ color: "#fff", fontFamily: "Arial" }}>
              {resumeData.roleDescription}
            </h3>

            <hr />

            <ul className="social">
              {(resumeData.socialLinks || []).map((item, i) => {
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
          <a className="smoothscroll" href="#about" aria-label="Scroll to About">
            <FaAngleDown aria-hidden="true" />
          </a>
        </p>
      </header>
    </>
  );
};

export default Header;
