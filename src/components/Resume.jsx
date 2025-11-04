import React from "react";
import resumeData from "../data/resume.js";

const TIER1 = 124;
const TIER2 = 104;

const getBullets = (item) => {
  if (Array.isArray(item?.bullets)) {
    return item.bullets.filter(Boolean).map((bullet) => String(bullet).trim());
  }

  return Object.keys(item || {})
    .filter((key) => /^Bullet\d+$/i.test(key))
    .sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, ""), 10);
      const nb = parseInt(b.replace(/\D/g, ""), 10);
      return na - nb;
    })
    .map((key) => (item?.[key] || "").toString().trim())
    .filter(Boolean);
};

const dateRange = (item) => {
  const start = item?.dateStarted || "";
  const endMonth = item?.MonthOfLeaving || "";
  const endYear = item?.YearOfLeaving || "";
  const end =
    (endMonth && endYear && `${endMonth} ${endYear}`) || endYear || "Present";

  return `${start} \u2192 ${end}`;
};

const linkedinSkillsUrl = () => {
  const id = resumeData.linkedinId || "mattdbaldwin";
  return `https://www.linkedin.com/in/${id}/details/skills/`;
};

export default function Resume() {
  const workHistory = resumeData.work || [];
  const education = resumeData.education || [];
  const skills = resumeData.skills || [];

  return (
    <section id="resume">
      <div className="row work">
        <div className="three columns header-col">
          <h1>
            <span>Work</span>
          </h1>
        </div>
        <div className="nine columns main-col">
          {workHistory.map((item) => {
            const bullets = getBullets(item);
            return (
              <div key={item.id} className="row item">
                <div className="twelve columns">
                  <h3>
                    <a
                      href={item.companyWeb}
                      target="_blank"
                      rel="noreferrer"
                      className="shine-link"
                    >
                      {item.companyName}
                    </a>
                  </h3>

                  <div className="info">
                    <h5>{item.specialization}</h5>
                    <em className="date">{dateRange(item)}</em>
                  </div>

                  {bullets.length > 0 && (
                    <ul className="work-bullets">
                      {bullets.map((bullet, index) => (
                        <li key={`${item.id}-bullet-${index}`}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="row education">
        <div className="three columns header-col">
          <h1>
            <span>Education</span>
          </h1>
        </div>
        <div className="nine columns main-col">
          {education.map((item) => (
            <div key={item.id} className="row item">
              <div className="twelve columns">
                <h3>{item.universityName}</h3>
                <p className="info">
                  {item.specialization}
                  <br />
                  {item.Achievements}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="row skill">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </div>
        <div className="nine columns main-col">
          {resumeData.skillsDescription && <p>{resumeData.skillsDescription}</p>}

          <div
            className="skills-bubbles"
            role="list"
            aria-label="Skills (click to view LinkedIn skills)"
          >
            {skills.map((skill, index) => {
              const size = skill.tier === 1 ? TIER1 : TIER2;
              const yOffset = -16 + ((index % 7) * 5);

              return (
                <span
                  key={skill.id || `${skill.skillname}-${index}`}
                  className="bubble-wrap"
                  role="listitem"
                  style={{ "--y": `${yOffset}px` }}
                >
                  <a
                    className="bubble"
                    href={linkedinSkillsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open LinkedIn skills (bubble: ${skill.skillname})`}
                    title={skill.skillname}
                    style={{ "--size": `${size}px` }}
                  >
                    <span className="bubble__inner">
                      <span className="bubble__label">{skill.skillname}</span>
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
