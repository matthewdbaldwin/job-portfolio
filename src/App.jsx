import React, { Suspense, lazy } from 'react';
import Header from './components/Header.jsx';
import SectionFallback from './components/SectionFallback.jsx';

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

    <Header />

    <main id="main-content" tabIndex="-1">
      <Suspense fallback={<SectionFallback label="About" />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Portfolio" />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Resume" />}>
        <Resume />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Testimonials" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Contact" />}>
        <ContactUs />
      </Suspense>
    </main>

    <Suspense fallback={<SectionFallback label="Footer" />}>
      <Footer />
    </Suspense>
  </div>
);

export default App;
