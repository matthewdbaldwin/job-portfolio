// /api/contact.js  (Vercel)
// npm i resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN; // e.g. https://matthewdbaldwin.com

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (ALLOWED_ORIGIN) {
    const origin = req.headers.origin || '';
    if (origin && origin !== ALLOWED_ORIGIN) {
      return res.status(403).json({ ok: false, error: 'Forbidden' });
    }
  }

  let data = {};
  try {
    data = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    return res.status(400).json({ ok: false, error: 'Bad request' });
  }

  // Honeypot
  if (data.company) return res.status(200).json({ ok: true });

  // Time-on-page gate (>= 3s)
  const started = Number(data.form_start);
  if (!Number.isFinite(started) || (Date.now() - started) < 3000) {
    return res.status(400).json({ ok: false, error: 'Please wait a moment before submitting.' });
  }

  const name = String(data.name || '').trim().slice(0, 80);
  const email = String(data.email || '').trim().toLowerCase().slice(0, 120);
  const message = String(data.message || '').trim().slice(0, 2000);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (name.length < 2 || !emailOk || message.length < 10) {
    return res.status(400).json({ ok: false, error: 'Validation failed.' });
  }

  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString();
  const subject = `New contact from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\nIP: ${ip}\n\n${message}`;

  try {
    await resend.emails.send({
      from: process.env.MAIL_FROM,   // e.g. "Portfolio <hello@yourdomain.com>"
      to: process.env.MAIL_TO,       // your inbox
      subject,
      text,
      reply_to: email
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ ok: false, error: 'Email failed. Please try later.' });
  }
}
