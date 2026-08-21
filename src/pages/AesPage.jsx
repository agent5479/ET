import { Link } from 'react-router-dom';
import AesVersatilityInfographic from '../components/AesVersatilityInfographic.jsx';
import { Card, CardGrid } from '../components/ui/Card.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import Section from '../components/ui/Section.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { SITE, mirrorAsset } from '../config/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './AesPage.css';

const STEPS = [
  { title: 'Collect', body: 'Wastewater leaves the septic tank into AES pipe.' },
  { title: 'Treat', body: 'Pipe and sand treat it in the bed — no pumps there.' },
  { title: 'Disperse', body: 'Effluent infiltrates. Add UV only if the consent requires it.' },
];

export default function AesPage() {
  usePageMeta({
    title: 'The AES System',
    description: 'AES onsite wastewater: septic to pipe-and-sand bed, set-and-forget field, NZ sites.',
  });

  return (
    <main className="et-page">
      <PageHero
        kicker="AES"
        title="How the wastewater system works"
        lede="Passive secondary treatment in pipe and sand. Set-and-forget in the field — no bed pumps."
      />

      <Section reveal={false}>
        <Card padLg className="et-aes-diagram-card">
          <img
            className="et-aes-product-mark"
            src={mirrorAsset(SITE.aesLogo)}
            alt="AES — Advanced Enviro-Septic"
            width={140}
            height={48}
            decoding="async"
          />
          <img
            src={mirrorAsset('wp-content/uploads/environment_technology_aes_model_vented.png')}
            alt="AES system model diagram"
          />
        </Card>
      </Section>

      <Section alt>
        <SectionHeader kicker="Steps" title="Three stages" />
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
          kicker="Layouts"
          title="Where it fits"
          lede="Residential, commercial, community, large-scale, constrained sites."
        />
        <Card padLg center className="et-infographic-card">
          <AesVersatilityInfographic expanded />
        </Card>
        <p className="et-aes-ctas">
          <Link className="et-btn et-btn-primary" to="/products/aes-system">
            AES product
          </Link>
          <Link className="et-btn et-btn-ghost-dark" to="/contact">
            Contact
          </Link>
        </p>
      </Section>
    </main>
  );
}
