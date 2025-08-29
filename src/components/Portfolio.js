import React, { Component } from 'react';
export default class Portfolio extends Component {
  render() {
    let resumeData = this.props.resumeData;
    return (
      <section id="portfolio">
                <div className="row">
          <div className="twelve columns collapsed">
            <h1>Samples of Work</h1>
              <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
              {
                resumeData.portfolio0 && resumeData.portfolio0.map((item)=>{
                  return(
                    <a key={item.id} href={item.url}>
                      <div className="columns portfolio-item">
                        <div className="item-wrap">
                            <img src={`${item.imgurl}`} alt={`${item.alt}`} className="item-img"/>
                            <div className="overlay">
                              <div className="portfolio-item-meta">
                                <h5>{item.name}</h5>
                                <p>{item.description}</p>
                              </div>
                            </div>
                        </div>
                      </div>
                    </a>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>Websites</h1>
              <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
              {
                resumeData.portfolio && resumeData.portfolio.map((item)=>{
                  return(
                    <a key={item.id} href={item.url}>
                      <div className="columns portfolio-item">
                        <div className="item-wrap">
                            <img src={`${item.imgurl}`} alt={`${item.alt}`} className="item-img"/>
                            <div className="overlay">
                              <div className="portfolio-item-meta">
                                <h5>{item.name}</h5>
                                <p>{item.description}</p>
                              </div>
                            </div>
                        </div>
                      </div>
                    </a>
                  )
                })
              }
            </div>
          </div>
        </div>
      </section>
    );
  }
}