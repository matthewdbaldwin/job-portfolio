import React from 'react';

const SectionFallback = ({ label }) => (
  <section className="section-loading" aria-live="polite" aria-busy="true">
    <span className="section-loading__spinner" aria-hidden="true" />
    <span className="section-loading__label">Loading {label}&hellip;</span>
  </section>
);

export default SectionFallback;
