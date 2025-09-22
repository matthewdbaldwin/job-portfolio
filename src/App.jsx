import React, { Component } from 'react';
import Header from './components/Header.jsx';
import About from './components/About.jsx';
import Resume from './components/Resume.jsx';
import Portfolio from './components/Portfolio.jsx';
import Testimonials from  './components/Testimonials.jsx';
import ContactUs from './components/ContactUs.jsx';
import Footer from './components/Footer.jsx';
import resumeData from './resumeData.jsx';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header resumeData={resumeData}/>
        <About resumeData={resumeData}/>
        <Portfolio resumeData={resumeData}/>
        <Resume resumeData={resumeData}/>
        <Testimonials resumeData={resumeData}/>
        <ContactUs resumeData={resumeData}/>
        <Footer resumeData={resumeData}/>
      </div>
    );
  }
}

export default App;
