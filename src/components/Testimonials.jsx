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

  useEffect(() => {
    if (!testimonials.length) return;
    const id = setInterval(() => setCurrent((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">
          <div className="two columns header-col">
            <h1><span>Client Testimonials</span></h1>
          </div>

          <div className="ten columns">
            <div className="t-rotator" role="region" aria-live="polite">
              <ul className="t-slides">
                {testimonials.map((t, idx) => (
                  <li
                    key={t.id || idx}
                    className={`t-slide ${idx === current ? "is-active" : ""}`}
                    aria-hidden={idx === current ? "false" : "true"}
                  >
                    <blockquote>
                      <QuoteIcon style={{ opacity: .7, marginBottom: 8 }} />
                      <p>{t.description}</p>
                      <cite>
                        {t.name} <em>{t.role}</em> — {t.company}
                      </cite>
                    </blockquote>
                  </li>
                ))}
              </ul>

              <div className="t-dots" role="tablist" aria-label="Testimonial slides">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={idx === current}
                    aria-controls={`t-slide-${idx}`}
                    onClick={() => setCurrent(idx)}
                    className={idx === current ? "is-active" : ""}
                  >
                    <span className="sr-only">Go to slide {idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
