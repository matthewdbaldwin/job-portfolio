import React, { Component } from 'react';

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      company: '',        // honeypot
      form_start: '',     // time-on-page stamp
      status: '',
      statusOk: true,
      submitting: false
    };
  }

  componentDidMount() {
    this.resetStart();
  }

  resetStart = () => {
    this.setState({ form_start: String(Date.now()) });
  };

  setStatus = (msg, ok = true) => {
    this.setState({ status: msg, statusOk: ok });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  endpoint = () => {
    // Allow override via prop; otherwise auto-pick based on host
    const { endpoint } = this.props;
    if (endpoint) return endpoint;

    const host =
      (typeof window !== 'undefined' && window.location && window.location.hostname) || '';
    if (host.includes('netlify.app')) return '/.netlify/functions/contact';
    return '/api/contact'; // Vercel-style default
  };

  validate = () => {
    const { name, email, message } = this.state;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (name.trim().length < 2 || !emailOk || message.trim().length < 10) {
      this.setStatus('Please check your entries and try again.', false);
      return false;
    }
    return true;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setStatus('');
    if (!this.validate()) return;

    this.setState({ submitting: true });

    try {
      const res = await fetch(this.endpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.name.trim(),
          email: this.state.email.trim().toLowerCase(),
          message: this.state.message.trim(),
          form_start: this.state.form_start,
          company: this.state.company // honeypot
        })
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        this.setStatus('Thanks! Your message has been sent.', true);
        this.setState({ name: '', email: '', message: '', company: '' });
        this.resetStart();
      } else {
        this.setStatus(
          data.error || 'Something went wrong. Please try again later.',
          false
        );
      }
    } catch {
      this.setStatus('Network error. Please try again.', false);
    } finally {
      this.setState({ submitting: false });
    }
  };

  render() {
    const resumeData = this.props.resumeData || {
      socialLinks: [{ url: '#' }],
      linkedinId: 'LinkedIn'
    };
    const socialLinkURL = resumeData.socialLinks?.[0] || { url: '#' };

    return (
      <section id="contact">
        <div className="row section-head">
          <div className="ten columns">
            <p className="lead">
              If you feel the need to contact me, please use <a
                  href={socialLinkURL.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >LinkedIn</a>.
            </p>
          </div>
        </div>
      </section>
    );
  }
}
