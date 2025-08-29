import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export default class Portfolio extends Component {
  state = {
    isOpen: false,
    photoIndex: 0,
  };

  openLightbox = (photoIndex, e) => {
    if (e) e.preventDefault();
    this.setState({ isOpen: true, photoIndex });
  };

  render() {
    const { resumeData } = this.props;
    const { isOpen, photoIndex } = this.state;

    const listA = resumeData.portfolio0 || [];
    const listB = resumeData.portfolio || [];
    const images = [
      ...listA.map((i) => i.imgurl),
      ...listB.map((i) => i.imgurl),
    ];
    const titles = [
      ...listA.map((i) => i.name),
      ...listB.map((i) => i.name),
    ];
    const captions = [
      ...listA.map((i) => i.description),
      ...listB.map((i) => i.description),
    ];

    const total = images.length;
    const nextIndex = (idx) => (idx + 1) % total;
    const prevIndex = (idx) => (idx + total - 1) % total;

    return (
      <section id="portfolio">
        {/* Samples of Work */}
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>Samples of Work</h1>
            <div id="portfolio-wrapper-0" className="bgrid-quarters s-bgrid-thirds cf">
              {listA.map((item, i) => {
                const globalIndex = i; // first block starts at 0
                return (
                  <a
                    key={item.id}
                    href={item.imgurl}
                    title={item.name}
                    onClick={(e) => this.openLightbox(globalIndex, e)}
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
                );
              })}
            </div>
          </div>
        </div>

        {/* Websites */}
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>Websites</h1>
            <div id="portfolio-wrapper-1" className="bgrid-quarters s-bgrid-thirds cf">
              {listB.map((item, i) => {
                const globalIndex = (listA.length) + i; // offset by first block length
                return (
                  <a
                    key={item.id}
                    href={item.imgurl}
                    title={item.name}
                    onClick={(e) => this.openLightbox(globalIndex, e)}
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
                );
              })}
            </div>
          </div>
        </div>

        {isOpen && total > 0 && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[nextIndex(photoIndex)]}
            prevSrc={images[prevIndex(photoIndex)]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({ photoIndex: prevIndex(photoIndex) })
            }
            onMoveNextRequest={() =>
              this.setState({ photoIndex: nextIndex(photoIndex) })
            }
            imageTitle={titles[photoIndex]}
            imageCaption={captions[photoIndex]}
            enableZoom={true}
          />
        )}
      </section>
    );
  }
}
