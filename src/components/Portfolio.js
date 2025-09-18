import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export default class Portfolio extends Component {
  state = { isOpen: false, photoIndex: 0 };

  // GA helper (safe if GA hasn't loaded yet)
  track = (eventName, params = {}) => {
    if (window.gtag) window.gtag('event', eventName, params);
  };

  openLightbox = (photoIndex, e, meta) => {
    if (e) e.preventDefault();
    this.track('portfolio_lightbox_open', {
      section: 'Samples of Work',
      index: photoIndex,
      id: meta?.id,
      name: meta?.name,
    });
    this.setState({ isOpen: true, photoIndex });
  };

  render() {
    const { resumeData } = this.props;
    const { isOpen, photoIndex } = this.state;

    const listA = resumeData.portfolio0 || []; // Samples of Work (lightbox)
    const listB = resumeData.portfolio  || []; // Websites (external links)

    // Only listA is in the lightbox gallery
    const images   = listA.map(i => i.imgurl);
    const titles   = listA.map(i => i.name);
    const captions = listA.map(i => i.description);

    const total = images.length;
    const nextIndex = (i) => (i + 1) % total;
    const prevIndex = (i) => (i + total - 1) % total;

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
                  onClick={(e) => this.openLightbox(i, e, { id: item.id, name: item.name })}
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
                  onClick={() =>
                    this.track('portfolio_visit_site', {
                      section: 'Websites',
                      id: item.id,
                      name: item.name,
                      url: item.url,
                    })
                  }
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

        {isOpen && total > 0 && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[nextIndex(photoIndex)]}
            prevSrc={images[prevIndex(photoIndex)]}
            onCloseRequest={() => {
              this.track('portfolio_lightbox_close', {
                section: 'Samples of Work',
                index: photoIndex,
                name: titles[photoIndex],
              });
              this.setState({ isOpen: false });
            }}
            onMovePrevRequest={() => {
              const to = prevIndex(photoIndex);
              this.track('portfolio_lightbox_nav', {
                direction: 'prev',
                to_index: to,
                name: titles[to],
              });
              this.setState({ photoIndex: to });
            }}
            onMoveNextRequest={() => {
              const to = nextIndex(photoIndex);
              this.track('portfolio_lightbox_nav', {
                direction: 'next',
                to_index: to,
                name: titles[to],
              });
              this.setState({ photoIndex: to });
            }}
            imageTitle={titles[photoIndex]}
            imageCaption={captions[photoIndex]}
            enableZoom
          />
        )}
      </section>
    );
  }
}
