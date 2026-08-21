import { Link } from 'react-router-dom';
import AesVersatilityInfographic from '../components/AesVersatilityInfographic.jsx';
import { Card, CardGrid } from '../components/ui/Card.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import Section from '../components/ui/Section.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { mirrorAsset } from '../config/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './AesPage.css';

const STEPS = [
  { title: 'Collect', body: 'Wastewater leaves the septic tank into AES pipe.' },
  { title: 'Treat', body: 'Biofilm and sand do the secondary work inside the bed.' },
  { title: 'Disperse', body: 'Cleaned effluent infiltrates — with optional UV where consents demand it.' },
];

export default function AesPage() {
  usePageMeta({
    title: 'The AES System',
    description:
      'How Advanced Enviro-Septic works — passive treatment, OSET-proven performance, and site versatility across New Zealand.',
  });

  return (
    <main className="et-page">
      <PageHero
        kicker="AES System"
        title="Advanced Enviro-Septic"
        lede="Passive secondary treatment in pipe and system sand — designed for NZ homes, commercial sites and large-scale projects without a noisy field plant."
      />

      <Section reveal={false}>
        <Card padLg className="et-aes-diagram-card">
          <img
            src={mirrorAsset('wp-content/uploads/environment_technology_aes_model_vented.png')}
            alt="AES system model diagram"
          />
        </Card>
      </Section>

      <Section alt>
        <SectionHeader kicker="Process" title="How it works" />
        <CardGrid cols={3}>
          {STEPS.map((step, i) => (
            <Card key={step.title} center padLg>
              <p className="et-kicker">Step {i + 1}</p>
              <h3 className="et-card__title">{step.title}</h3>
              <p className="et-card__body">{step.body}</p>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <SectionHeader
          kicker="Versatility"
          title="Versatility of AES"
          lede="One treatment language across residential, commercial, community and large-scale work — and layouts that respect tight contours."
        />
        <Card padLg center className="et-infographic-card">
          <AesVersatilityInfographic expanded />
        </Card>
        <p className="et-aes-ctas">
          <Link className="et-btn et-btn-primary" to="/products/aes-system">
            AES product page
          </Link>
          <Link className="et-btn et-btn-ghost-dark" to="/contact">
            Talk to ET
          </Link>
        </p>
      </Section>
    </main>
  );
}
