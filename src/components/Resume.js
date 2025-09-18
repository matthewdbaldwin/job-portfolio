// src/components/Resume.js
import React, { Component } from 'react';

export default class Resume extends Component {
  linkedinSkillsUrl = () => {
    const id = (this.props.resumeData && this.props.resumeData.linkedinId) || 'mattdbaldwin';
    return `https://www.linkedin.com/in/${id}/details/skills/`;
  };

  render() {
    const resumeData = this.props.resumeData || {};
    const skills = resumeData.skills || [];

    // 
    // Tier 1 = (160 * .9 = 144)
    //  Tier 2 = (80 * 1.3 = 104)
    const TIER1 = 124; // px
    const TIER2 = 104; // px

    return (
      <section id="resume">
        {/* Work */}
        <div className="row work">
          <div className="three columns header-col">
            <h1><span>Work</span></h1>
          </div>
          <div className="nine columns main-col">
            {(resumeData.work || []).map(item => (
              <div key={item.id} className="row item">
                <div className="twelve columns">
                  <h3>
                    <a href={item.CompanyWeb} target="_blank" rel="noreferrer" className="shine-link">
                      {item.CompanyName}
                    </a>
                  </h3>
                  <p className="info">
                    {item.specialization}
                    <span>&bull;</span>{' '}
                    <em className="date">
                      {item.dateStarted} <span>&rarr;</span> {item.MonthOfLeaving} {item.YearOfLeaving}
                    </em>
                  </p>
                  <p>
                    • {item.Bullet1}<br/>
                    • {item.Bullet2}<br/>
                    • {item.Bullet3}<br/>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Education</span></h1>
          </div>
          <div className="nine columns main-col">
            {(resumeData.education || []).map(item => (
              <div key={item.id} className="row item">
                <div className="twelve columns">
                  <h3>{item.UniversityName}</h3>
                  <p className="info">
                    {item.specialization}<br/>
                    {item.Achievements}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills (blue bubbles; Tier 1 = 144px, Tier 2 = 104px) */}
        <div className="row skill">
          <div className="three columns header-col">
            <h1><span>Skills</span></h1>
          </div>
          <div className="nine columns main-col">
            {resumeData.skillsDescription && <p>{resumeData.skillsDescription}</p>}

            <div className="skills-bubbles" role="list" aria-label="Skills (click to view LinkedIn skills)">
              {skills.map((s, idx) => {
                const size = s.tier === 1 ? TIER1 : TIER2; // default to Tier 2 size if tier missing
                const yOffset = (-16 + (idx % 7) * 5);     // subtle vertical stagger

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

            <p style={{marginTop:12, color:'#777', fontSize:14}}>
              Click any bubble to open my LinkedIn skills.
            </p>
          </div>
        </div>
      </section>
    );
  }
}
