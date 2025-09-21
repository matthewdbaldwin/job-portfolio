// src/components/Portfolio.jsx
import React, { Component } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// styles
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default class Portfolio extends Component {
  state = { isOpen: false, photoIndex: 0 };

  render() {
    const { resumeData } = this.props;
    const listA = resumeData.portfolio0 || []; // Lightbox gallery ("Samples of Work")
    const listB = resumeData.portfolio  || []; // External sites ("Websites")

    const slides = listA.map(item => ({
          src: item.imgurl,
          title: item.name,           // used by Captions plugin
          description: item.description
    }));

    const { isOpen, photoIndex } = this.state;

    return (
      <section id="portfolio">
        {/* Samples of Work → Lightbox */}
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>Samples of Work</h1>
            <div id="portfolio-grid-0" className="bgrid-quarters s-bgrid-thirds cf">
              {listA.map((item, i) => (
                <a
                  key={item.id}
                  href={item.imgurl}
                  title={item.name}
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ isOpen: true, photoIndex: i });
                  }}
                >
                  <div className="columns portfolio-item">
                    <div className="item-wrap">
                      <img src={item.imgurl} alt={item.alt} className="item-img" />
                      <div className="overlay">
                        <div className="portfolio-item-meta">
                          <h5>{item.name}</h5>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Websites → Direct links */}
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>Websites</h1>
            <div id="portfolio-grid-1" className="bgrid-quarters s-bgrid-thirds cf">
              {listB.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  title={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="columns portfolio-item ">
                    <div className="item-wrap">
                      <img src={item.imgurl} alt={item.alt} className="item-img" />
                      <div className="overlay">
                        <div className="portfolio-item-meta">
                          <h5>{item.name}</h5>
                          <p>{item.description}</p>
                        </div> 
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>


        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => this.setState({ isOpen: false })}
            slides={slides}
            plugins={[Captions, Thumbnails, Zoom]}
            // optional plugin configs:
            captions={{ showToggle: true }}
            thumbnails={{ width: 120, height: 80, border: 1 }}
          />
        )}
      </section>
    );
  }
}
