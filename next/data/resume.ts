export type SocialLink = {
  id: string
  name: string
  url: string
}

export type WorkExperience = {
  id: string
  company: string
  companyUrl?: string
  role: string
  start: string
  end: string
  bullets: string[]
}

export type Education = {
  id: string
  school: string
  field: string
  graduated: string
  achievement: string
}

export type Skill = {
  id: string
  name: string
  tier: 1 | 2
}

export type PortfolioItem = {
  id: string
  name: string
  description: string
  url: string
  image: string
  alt: string
}

export type Testimonial = {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export type Resume = {
  name: string
  role: string
  tagline: string
  email: string
  linkedinId: string
  address: string
  about: string[]
  aboutSecondary: string
  socialLinks: SocialLink[]
  work: WorkExperience[]
  education: Education[]
  skills: Skill[]
  portfolio: PortfolioItem[]
  portfolioGallery: PortfolioItem[]
  testimonials: Testimonial[]
}

export const resume: Resume = {
  name: 'Matthew Baldwin',
  role: 'Senior Digital Product Leader',
  tagline:
    'Website strategy, digital governance, and full-funnel marketing for global B2B brands.',
  email: 'hello@matthewdbaldwin.com',
  linkedinId: 'mattdbaldwin',
  address: 'Orange County, CA',
  about: [
    'I specialize in owning the full digital experience for B2B and enterprise brands, ensuring the website is a scalable engine for business growth.',
    'I bring a hybrid skill set, combining analytical content design and strategy with frontend technical fluency (HTML/CSS, JavaScript, React, PHP/MySQL). This lets me define strategic roadmaps, architect scalable automation, and accurately communicate requirements to technical teams and agencies.',
    'Revenue leadership: directly supported over $12M in revenue impact by aligning campaign data, design assets, and GTM strategy.',
    'Lead generation: drove a 425% increase in lead flow and 150% traffic growth by optimizing the full growth funnel and site architecture.',
    'Conversion: boosted website conversion rates by 37% through UX/UI improvements, content, and data-driven experimentation.',
    'Operational scalability: architected automation workflows between the website and CRM, ensuring projects align with measurable business goals.',
  ],
  aboutSecondary:
    'Colleagues know me as a collaborative, versatile leader who simplifies complex systems, supports stakeholders, and ensures campaigns launch on time and on brand. I bring a full-stack perspective blending strategy, content, analytics, design, and technology to deliver measurable growth.',
  socialLinks: [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mattdbaldwin/',
    },
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/matthewdbaldwin',
    },
  ],
  work: [
    {
      id: 'microport',
      company: 'MicroPort',
      companyUrl: 'https://www.microport.com/',
      role: 'Senior Supervisor, Digital Product',
      start: 'February 2026',
      end: 'Present',
      bullets: [
        "Leading the redesign and launch of MicroPort's global corporate website in coordination with external vendors and internal stakeholders, defining the roadmap for functionality, UX, and performance.",
        'Developing and enforcing digital governance guidelines covering accessibility, data privacy, and localization (GDPR, regional cybersecurity), with regular KPI reporting on traffic, SEO, and engagement.',
        'Translating medical affairs initiatives into polished web and video content, and coordinating brand-aligned digital standards across the website, LinkedIn, and other digital channels.',
      ],
    },
    {
      id: 'profound-logic',
      company: 'Profound Logic',
      companyUrl: 'https://profoundlogic.com/',
      role: 'Marketing Developer',
      start: 'October 2020',
      end: 'January 2026',
      bullets: [
        'Launched and scaled GTM and account-based campaigns in HubSpot across 200+ global initiatives, with performance reporting that drove data-driven decisions.',
        'Bridged the web development team and stakeholders across marketing, sales, and product to ensure digital initiatives aligned with KPIs and delivered measurable results.',
        'Partnered with sales and marketing to track and optimize the funnel, aligning WordPress web strategy to achieve a 37% boost in lead generation and conversion.',
      ],
    },
    {
      id: 'iqvia',
      company: 'IQVIA',
      companyUrl: 'https://iqvia.com/',
      role: 'Marketing Manager',
      start: 'April 2013',
      end: 'October 2020',
      bullets: [
        'Developed and deployed responsive HTML email campaigns via Pardot and Salesforce Eloqua Engage, totaling 50M+ sends in 2019.',
        'Supported marketing and sales ops by managing campaign data, materials, and communications for a 6,000-person team.',
        'Managed customer databases in Salesforce and Pardot — handling segmentation, reporting, and extractions to enable targeted lifecycle campaigns with 20% higher engagement.',
      ],
    },
    {
      id: 'ricoh',
      company: 'Ricoh (formerly AnaJet)',
      companyUrl: 'https://ricohdtg.com/',
      role: 'Online Marketing Specialist',
      start: 'May 2010',
      end: 'April 2013',
      bullets: [
        'Designed and deployed email campaigns through Marketo, growing the subscriber base and improving open rates through segmentation and testing.',
        'Increased website lead flow by 425% and traffic by 150% year-over-year through custom WordPress development and PHP/MySQL management.',
        'Led Google Ads campaigns with a monthly PPC budget of over $10,500, improving ROI by 35% through keyword optimization and A/B testing.',
      ],
    },
  ],
  education: [
    {
      id: 'cal-poly',
      school: 'California State Polytechnic University, Pomona',
      field: 'Business Administration',
      graduated: 'June 2008',
      achievement: 'Marketing concentration',
    },
    {
      id: 'learning-fuze',
      school: 'Learning Fuze',
      field: 'Full-stack development',
      graduated: 'March 2020',
      achievement: 'Completed full-stack development program',
    },
  ],
  skills: [
    { id: 'WebsiteStrategy', name: 'Website Strategy', tier: 1 },
    { id: 'DigitalGovernance', name: 'Digital Governance', tier: 1 },
    { id: 'DigitalMarketing', name: 'Digital Marketing', tier: 1 },
    { id: 'ContentStrategy', name: 'Content Strategy', tier: 1 },
    { id: 'MarketingAutomation', name: 'Marketing Automation', tier: 1 },
    { id: 'CampaignManagement', name: 'Campaign Management', tier: 1 },
    { id: 'EmailMarketing', name: 'Email Marketing', tier: 1 },
    { id: 'LeadGeneration', name: 'Lead Generation', tier: 1 },
    { id: 'SEO', name: 'SEO', tier: 1 },
    { id: 'SEMPPC', name: 'SEM & PPC', tier: 1 },
    { id: 'GA4', name: 'Google Analytics 4', tier: 1 },
    { id: 'Salesforce', name: 'Salesforce', tier: 1 },
    { id: 'HubSpot', name: 'HubSpot', tier: 1 },
    { id: 'Pardot', name: 'Pardot', tier: 1 },
    { id: 'Marketo', name: 'Marketo', tier: 1 },
    { id: 'UX', name: 'UX & UI Design', tier: 1 },
    { id: 'HTMLCSS', name: 'HTML & CSS', tier: 2 },
    { id: 'JavaScript', name: 'JavaScript', tier: 2 },
    { id: 'React', name: 'React', tier: 2 },
    { id: 'WordPress', name: 'WordPress', tier: 2 },
    { id: 'AdobeCC', name: 'Adobe Creative Cloud', tier: 2 },
    { id: 'BrandArchitecture', name: 'Brand Architecture', tier: 2 },
    { id: 'SocialMedia', name: 'Social Media Management', tier: 2 },
    { id: 'VideoContent', name: 'Video Content', tier: 2 },
    { id: 'Copywriting', name: 'Copywriting', tier: 2 },
    { id: 'GDPR', name: 'GDPR & Compliance', tier: 2 },
    { id: 'Accessibility', name: 'Web Accessibility', tier: 2 },
    { id: 'Localization', name: 'Localization', tier: 2 },
    { id: 'VendorManagement', name: 'Vendor Management', tier: 2 },
    { id: 'KPIReporting', name: 'KPI Reporting', tier: 2 },
    { id: 'ProjectManagement', name: 'Project Management', tier: 2 },
    { id: 'B2BMarketing', name: 'B2B Marketing', tier: 2 },
    { id: 'CRO', name: 'Conversion Rate Optimization', tier: 2 },
    { id: 'ABM', name: 'Account Based Marketing', tier: 2 },
  ],
  portfolio: [
    {
      id: 'microport',
      name: 'MicroPort.com',
      description: 'Global corporate website redesign and digital governance.',
      url: 'https://www.microport.com',
      image: '/images/portfolio/microport.webp',
      alt: 'MicroPort',
    },
    {
      id: 'profoundlogic',
      name: 'Profoundlogic.com',
      description: 'Full site redesign that increased conversions by 37% and lead flow by 425%.',
      url: 'https://www.profoundlogic.com',
      image: '/images/portfolio/plcom.webp',
      alt: 'profoundlogic.com',
    },
    {
      id: 'profoundjs',
      name: 'Profoundjs.com',
      description: 'Developer documentation site with social login API integrations.',
      url: 'https://www.profoundjs.com',
      image: '/images/portfolio/pjscom.webp',
      alt: 'profoundjs.com',
    },
    {
      id: 'winwin',
      name: 'winwinbrewery.com',
      description: 'Personal hobby site designed and built from scratch.',
      url: 'https://winwinbrewery.com',
      image: '/images/portfolio/winwin.webp',
      alt: 'Win Win Brewery',
    },
    {
      id: 'onekeydata',
      name: 'onekeydata.com',
      description: 'IQVIA data platform site built in Expression Engine with whitepaper assets.',
      url: 'https://onekeydata.com',
      image: '/images/portfolio/onekey.webp',
      alt: 'onekeydata.com',
    },
  ],
  portfolioGallery: [
    {
      id: 'Profoundlogic1',
      name: 'Profoundlogic.com Redesign 2020',
      description:
        'Profound Logic Software main site I redesigned in 2020. UI/UX redesign of the front page with fresh icons and a three-part layout at the bottom with core features.',
      url: 'https://web.archive.org/web/20210808202810/https:/www.profoundlogic.com/',
      image: '/images/portfolio/Profoundlogic1.webp',
      alt: 'profoundlogic.com 2020',
    },
    {
      id: 'Profoundlogic2',
      name: 'Profoundlogic.com Redesign 2022',
      description: 'Sample of Profoundlogic.com website redesign in 2022. More corporate look targeting IT leaders.',
      url: '/images/portfolio/Profoundlogic2-large.webp',
      image: '/images/portfolio/Profoundlogic2.webp',
      alt: 'profoundlogic.com 2022',
    },
    {
      id: 'Profoundlogic3',
      name: 'Profoundlogic.com Blog',
      description: 'Blog redesign completed in 2022 with Canva imagery and industry-targeted copy for IT professionals.',
      url: '/images/portfolio/Profoundlogic2-1-large.webp',
      image: '/images/portfolio/Profoundlogic2-1.webp',
      alt: 'profoundlogic.com blog',
    },
    {
      id: 'Profoundlogic4',
      name: 'Profoundlogic.com Blog Post',
      description: 'Blog post redesign with targeted copy and a word-cloud layout for software engineers and IT professionals.',
      url: '/images/portfolio/Profoundlogic2-2-large.webp',
      image: '/images/portfolio/Profoundlogic2-2.webp',
      alt: 'profoundlogic.com blog post',
    },
    {
      id: 'Profoundlogic5',
      name: 'Profoundlogic.com Whitepaper',
      description: 'Whitepaper redesigned with a larger hero image and more engaging content layout.',
      url: '/images/portfolio/Profoundlogic-whitepaper-large.webp',
      image: '/images/portfolio/Profoundlogic-whitepaper.webp',
      alt: 'profoundlogic.com whitepaper',
    },
    {
      id: 'IQVIA1',
      name: 'Prescriber Credentials',
      description: 'IQVIA email designed in Illustrator and Photoshop for a pharmaceutical prescriber data tradeshow campaign.',
      url: '/images/portfolio/IQVIA1-large.webp',
      image: '/images/portfolio/IQVIA1.webp',
      alt: 'prescriber credentials',
    },
    {
      id: 'IQVIA2',
      name: 'Email Header — Healthcare Leaders',
      description: 'IQVIA email header designed in Photoshop following company branding guidelines.',
      url: '/images/portfolio/IQVIA2-large.webp',
      image: '/images/portfolio/IQVIA2.webp',
      alt: 'healthcare leaders',
    },
    {
      id: 'IQVIA3',
      name: 'IDN Whitepaper',
      description: 'IQVIA whitepaper built from an Excel spreadsheet with curated copy showing the top 25 integrated delivery networks.',
      url: '/images/portfolio/IQVIA3-large.webp',
      image: '/images/portfolio/IQVIA3.webp',
      alt: 'whitepaper',
    },
  ],
  testimonials: [
    {
      id: 'PL',
      quote: 'Thank you for all your hard work.',
      author: 'Miranda VanHorn',
      role: 'Marketing Director',
      company: 'Profound Logic Software',
    },
    {
      id: 'BV',
      quote: 'Leading in Marketing is your strength.',
      author: 'Eric Strickland',
      role: 'Senior Consultant',
      company: 'Black and Veatch',
    },
    {
      id: 'QI',
      quote: 'Matt has a lot of technical skills.',
      author: 'Mattias Huber',
      role: 'Software Engineer',
      company: 'Qualcomm Innovation',
    },
  ],
}
