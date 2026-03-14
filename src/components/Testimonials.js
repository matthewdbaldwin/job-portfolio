import React, { Component } from 'react';

export default class Testimonials extends Component {
  constructor(props) {
    super(props);
    this.state = { current: 0 };
    this.timer = null;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer() {
    const items = this.props.resumeData.testimonials || [];
    if (items.length < 2) return;
    this.timer = setInterval(() => {
      this.setState(prev => ({ current: (prev.current + 1) % items.length }));
    }, 5000);
  }

  goTo(index) {
    clearInterval(this.timer);
    this.setState({ current: index });
    this.startTimer();
  }

  render() {
    const { resumeData } = this.props;
    const items = resumeData.testimonials || [];
    const { current } = this.state;

    return (
      <section id="testimonials">
        <div className="text-container">
          <div className="row">
            <div className="two columns header-col">
              <h1><span>Client Testimonials</span></h1>
            </div>

            <div className="ten columns flex-container">
              <div className="testimonial-carousel">
                <div className="testimonial-track">
                  {items.map((item, i) => (
                    <div
                      key={item.id}
                      className={`testimonial-slide${i === current ? ' active' : ''}`}
                      aria-hidden={i !== current}
                    >
                      <blockquote>
                        <p>{item.description}</p>
                        <cite>
                          {item.name}&#160;<em>{item.role}</em>&#160;<strong>{item.company}</strong>
                        </cite>
                      </blockquote>
                    </div>
                  ))}
                </div>

                {items.length > 1 && (
                  <div className="testimonial-dots">
                    {items.map((_, i) => (
                      <button
                        key={i}
                        className={`testimonial-dot${i === current ? ' active' : ''}`}
                        onClick={() => this.goTo(i)}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
