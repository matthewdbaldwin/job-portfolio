// src/components/Resume.js
import React, { Component } from 'react';

export default class Resume extends Component {
  linkedinSkillsUrl = () => {
    const id = (this.props.resumeData && this.props.resumeData.linkedinId) || 'mattdbaldwin';
    return `https://www.linkedin.com/in/${id}/details/skills/`;
  };

  // Collect Bullet1/Bullet2/Bullet3... (or an optional item.bullets array)
  getBullets = (item) => {
    if (Array.isArray(item.bullets)) {
      return item.bullets.filter(Boolean).map((b) => String(b).trim()).filter(Boolean);
    }
    return Object.keys(item)
      .filter((k) => /^Bullet\d+$/i.test(k))
      .sort((a, b) => {
        const na = parseInt(a.replace(/\D/g, ''), 10);
        const nb = parseInt(b.replace(/\D/g, ''), 10);
        return na - nb;
      })
      .map((k) => (item[k] || '').toString().trim())
      .filter(Boolean);
  };

  // Format date range like "October 2020 → Present"
  dateRange = (item) => {
    const start = item.dateStarted || '';
    const endMonth = item.MonthOfLeaving || '';
    const endYear = item.YearOfLeaving || '';
    const end =
      (endMonth && endYear && `${endMonth} ${endYear}`) ||
      endYear ||
      'Present';
    return `${start} \u2192 ${end}`; // → arrow
  };

  render() {
    const resumeData = this.props.resumeData || {};
    const skills = resumeData.skills || [];

    // Tier sizes (your requested)
    const TIER1 = 124; // px (10% smaller than 160)
    const TIER2 = 104; // px (30% larger than 80)

    return (
      <section id="resume">
        {/* Work */}
        <div className="row work">
          <div className="three columns header-col">
            <h1><span>Work</span></h1>
          </div>
          <div className="nine columns main-col">
            {(resumeData.work || []).map((item) => {
              const bullets = this.getBullets(item);
              return (
                <div key={item.id} className="row item">
                  <div className="twelve columns">
                    <h3>
                      <a
                        href={item.CompanyWeb}
                        target="_blank"
                        rel="noreferrer"
                        className="shine-link"
                      >
                        {item.CompanyName}
                      </a>
                    </h3>

                    <div className="info">
                      <h5>{item.specialization}</h5>
                      <em className="date">{this.dateRange(item)}</em>
                    </div>

                    {bullets.length > 0 && (
                      <ul className="work-bullets">
                        {bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education */}
        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Education</span></h1>
          </div>
          <div className="nine columns main-col">
            {(resumeData.education || []).map((item) => (
              <div key={item.id} className="row item">
                <div className="twelve columns">
                  <h3>{item.UniversityName}</h3>
                  <p className="info">
                    {item.specialization}<br />
                    {item.Achievements}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills (blue bubbles; Tier 1 = 124px, Tier 2 = 104px) */}
        <div className="row skill">
          <div className="three columns header-col">
            <h1><span>Skills</span></h1>
          </div>
          <div className="nine columns main-col">
            {resumeData.skillsDescription && <p>{resumeData.skillsDescription}</p>}

            <div
              className="skills-bubbles"
              role="list"
              aria-label="Skills (click to view LinkedIn skills)"
            >
              {skills.map((s, idx) => {
                const size = s.tier === 1 ? TIER1 : TIER2;
                const yOffset = -16 + (idx % 7) * 5;
                return (
                  <span
                    key={s.id || `${s.skillname}-${idx}`}
                    className="bubble-wrap"
                    role="listitem"
                    style={{ '--y': `${yOffset}px` }}
                  >
                    <a
                      className="bubble"
                      href={this.linkedinSkillsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open LinkedIn skills (bubble: ${s.skillname})`}
                      title={s.skillname}
                      style={{ '--size': `${size}px` }}
                    >
                      <span className="bubble__inner">
                        <span className="bubble__label">{s.skillname}</span>
                      </span>
                    </a>
                  </span>
                );
              })}
            </div>

            <p style={{ marginTop: 12, color: '#777', fontSize: 14 }}>
              Click any bubble to open my LinkedIn skills.
            </p>
          </div>
        </div>
      </section>
    );
  }
}
