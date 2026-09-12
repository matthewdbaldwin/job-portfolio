// src/components/Testimonials.jsx
import React, { useEffect, useState } from "react";

const QuoteIcon = (props) => (
  <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M7 7h4v4H9v3H5V9a2 2 0 0 1 2-2zm10 0h4v4h-2v3h-4V9a2 2 0 0 1 2-2z"/>
  </svg>
);

export default function Testimonials({ resumeData }) {
  const testimonials = resumeData?.testimonials || [];
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const hasMultipleSlides = testimonials.length > 1;

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    updatePreference(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePreference);
    } else {
      mediaQuery.addListener(updatePreference);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updatePreference);
      } else {
        mediaQuery.removeListener(updatePreference);
      }
    };
  }, []);

  useEffect(() => {
    if (!testimonials.length || !hasMultipleSlides || isPaused || prefersReducedMotion) {
      return undefined;
    }

    const id = window.setInterval(() => {
      setCurrent((i) => (i + 1) % testimonials.length);
    }, 6000);

    return () => {
      window.clearInterval(id);
    };
  }, [hasMultipleSlides, isPaused, prefersReducedMotion, testimonials.length]);

  useEffect(() => {
    if (current >= testimonials.length) {
      setCurrent(0);
    }
  }, [current, testimonials.length]);

  const goToSlide = (idx) => {
    setCurrent(idx);
    setIsPaused(true);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  if (!testimonials.length) return null;

  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">
          <div className="two columns header-col">
            <h1><span>Client Testimonials</span></h1>
          </div>

          <div className="ten columns">
            <div
              className="t-rotator"
              role="region"
              aria-live={prefersReducedMotion ? "off" : "polite"}
              aria-atomic="true"
            >
              <ul className="t-slides" aria-label="Testimonials">
                {testimonials.map((t, idx) => {
                  const slideId = `t-slide-${idx}`;
                  const tabId = `t-tab-${idx}`;
                  const isActive = idx === current;

                  return (
                    <li
                      key={t.id || idx}
                      id={slideId}
                      className={`t-slide ${isActive ? "is-active" : ""}`}
                      aria-labelledby={tabId}
                      hidden={!isActive}
                    >
                      <blockquote>
                        <QuoteIcon style={{ opacity: .7, marginBottom: 8 }} />
                        <p>{t.description}</p>
                        <cite>
                          {t.name} <em>{t.role}</em> — {t.company}
                        </cite>
                      </blockquote>
                    </li>
                  );
                })}
              </ul>

              {hasMultipleSlides && (
                <div className="t-controls">
                  <div className="t-dots" role="group" aria-label="Select a testimonial">
                    {testimonials.map((_, idx) => {
                      const tabId = `t-tab-${idx}`;
                      const slideId = `t-slide-${idx}`;
                      const isActive = idx === current;

                      return (
                        <button
                          key={idx}
                          id={tabId}
                          type="button"
                          aria-controls={slideId}
                          aria-current={isActive ? "true" : undefined}
                          onClick={() => goToSlide(idx)}
                          className={isActive ? "is-active" : ""}
                        >
                          <span className="sr-only">Go to slide {idx + 1}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!prefersReducedMotion && (
                    <button
                      type="button"
                      className="t-pause"
                      onClick={togglePause}
                      aria-pressed={isPaused}
                      aria-label={isPaused ? "Resume testimonial rotation" : "Pause testimonial rotation"}
                    >
                      {isPaused ? "Resume" : "Pause"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
