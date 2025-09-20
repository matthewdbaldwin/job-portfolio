import React, { useState, useEffect } from "react";

export default function Testimonials({ resumeData }) {
  const testimonials = resumeData?.testimonials || [];
  const [current, setCurrent] = useState(0);

  // Auto rotate every 6s
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">
          <div className="two columns header-col">
            <h1>
              <span>Client Testimonials</span>
            </h1>
          </div>

          <div className="ten columns flex-container">
            <div className="flexslider">
              <ul className="slides">
                {testimonials.map((item, idx) => (
                  <li
                    key={item.id}
                    style={{
                      display: idx === current ? "block" : "none",
                      opacity: idx === current ? 1 : 0,
                      transition: "opacity 0.8s ease-in-out",
                    }}
                  >
                    <blockquote>
                      <p>{item.description}</p>
                      <cite>
                        {item.name} <em>{item.role}</em> — {item.company}
                      </cite>
                    </blockquote>
                  </li>
                ))}
              </ul>

              {/* Dots / controls */}
              <ul className="flex-control-nav flex-control-paging">
                {testimonials.map((_, idx) => (
                  <li key={idx}>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrent(idx);
                      }}
                      className={idx === current ? "flex-active" : ""}
                    >
                      {idx + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
