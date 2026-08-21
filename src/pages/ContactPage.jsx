import { useState } from 'react';
import { Card } from '../components/ui/Card.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import Section from '../components/ui/Section.jsx';
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
      <PageHero
        kicker="Contact"
        title="Call or send a short enquiry"
        lede={`${SITE.hours}. Form is UI-only on this test site — use phone or email for real requests.`}
      />
      <Section reveal={false}>
        <div className="et-contact-grid">
          <Card padLg>
            <h2 className="et-card__title">Reach us</h2>
            <p className="et-card__body">
              <strong>{SITE.name} Ltd</strong>
              <br />
              {SITE.address.line1}
              <br />
              {SITE.address.locality} {SITE.address.postalCode}
              <br />
              New Zealand
            </p>
            <p className="et-card__body">
              <a href={`tel:${SITE.freephoneTel}`}>{SITE.freephoneLabel}</a> / {SITE.freephone}
              <br />
              <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
              <br />
              <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
            </p>
            <p className="et-card__meta">{SITE.hours}</p>
          </Card>

          <Card padLg>
            <h2 className="et-card__title">Enquiry</h2>
            {sent ? (
              <p className="et-card__body">
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
          </Card>
        </div>
      </Section>
    </main>
  );
}
