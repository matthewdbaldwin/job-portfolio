import React, { Suspense, lazy } from 'react';
import Header from './components/Header.jsx';
import SectionFallback from './components/SectionFallback.jsx';
import resumeData from './resumeData.jsx';

const About = lazy(() => import('./components/About.jsx'));
const Portfolio = lazy(() => import('./components/Portfolio.jsx'));
const Resume = lazy(() => import('./components/Resume.jsx'));
const Testimonials = lazy(() => import('./components/Testimonials.jsx'));
const ContactUs = lazy(() => import('./components/ContactUs.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));

const App = () => (
  <div className="App">
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>

    <Header resumeData={resumeData} />

    <main id="main-content" tabIndex="-1">
      <Suspense fallback={<SectionFallback label="About" />}>
        <About resumeData={resumeData} />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Portfolio" />}>
        <Portfolio resumeData={resumeData} />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Resume" />}>
        <Resume resumeData={resumeData} />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Testimonials" />}>
        <Testimonials resumeData={resumeData} />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Contact" />}>
        <ContactUs resumeData={resumeData} />
      </Suspense>
    </main>

    <Suspense fallback={<SectionFallback label="Footer" />}>
      <Footer resumeData={resumeData} />
    </Suspense>
  </div>
);

export default App;
