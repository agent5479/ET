import { useState } from 'react';
import { SITE } from '../config/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './ContactPage.css';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  usePageMeta({
    title: 'Contact',
    description: 'Contact Environment Technology in Nelson for AES advice, pricing pathways and designer referrals.',
  });

  function onSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="et-page">
      <div className="et-wrap et-contact">
        <p className="et-kicker">Contact</p>
        <h1>Talk to Environment Technology</h1>
        <p className="et-lede">
          Freephone advice, Nelson depot hours, and a simple enquiry form (UI only for this test rebuild — wire a
          backend when you choose a destination).
        </p>

        <div className="et-contact-grid">
          <div className="et-contact-card">
            <h2>Reach us</h2>
            <p>
              <strong>{SITE.name} Ltd</strong>
              <br />
              {SITE.address.line1}
              <br />
              {SITE.address.locality} {SITE.address.postalCode}
              <br />
              New Zealand
            </p>
            <p>
              <a href={`tel:${SITE.freephoneTel}`}>{SITE.freephoneLabel}</a> / {SITE.freephone}
              <br />
              <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
              <br />
              <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
            </p>
            <p>{SITE.hours}</p>
          </div>

          <div className="et-contact-card">
            <h2>Enquiry</h2>
            {sent ? (
              <p className="et-form-thanks">
                Thanks — this demo form does not send yet. Email{' '}
                <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> or call {SITE.freephone}.
              </p>
            ) : (
              <form className="et-form" onSubmit={onSubmit}>
                <label>
                  Name
                  <input name="name" required autoComplete="name" />
                </label>
                <label>
                  Email
                  <input type="email" name="email" required autoComplete="email" />
                </label>
                <label>
                  Phone
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
                <label>
                  Message
                  <textarea name="message" rows={5} required />
                </label>
                <button className="et-btn et-btn-primary" type="submit">
                  Send enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
