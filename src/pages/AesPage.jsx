import { Link } from 'react-router-dom';
import AesBedShapes from '../components/diagrams/AesBedShapes.jsx';
import AesPipeLayers from '../components/diagrams/AesPipeLayers.jsx';
import AesProcessFlow from '../components/diagrams/AesProcessFlow.jsx';
import AesVersatilityInfographic from '../components/AesVersatilityInfographic.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import Section from '../components/ui/Section.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { SITE, mirrorAsset } from '../config/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './AesPage.css';

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
        <figure className="et-aes-cutaway">
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
            alt="Cutaway of a house and yard showing septic tank, AES treatment bed, and soil infiltration under a usable lawn"
          />
          <figcaption className="et-aes-cutaway__caption">
            Buried under the lawn: tank, AES pipe-and-sand bed, and dispersal — family activity stays above.
          </figcaption>
        </figure>
      </Section>

      <Section alt>
        <SectionHeader
          kicker="Flow"
          title="Four stages"
          lede="From the house to the soil — tap a stage for the short version."
        />
        <AesProcessFlow />
      </Section>

      <Section>
        <SectionHeader
          kicker="Inside the pipe"
          title="Where treatment happens"
          lede="Layers around the corrugated pipe, then system sand — not a noisy plant in the bed."
        />
        <AesPipeLayers />
      </Section>

      <Section alt>
        <SectionHeader
          kicker="Layouts"
          title="Where it fits"
          lede="Residential, commercial, community, large-scale, constrained sites."
        />
        <div className="et-aes-layouts">
          <AesVersatilityInfographic expanded />
          <div className="et-aes-layouts__shapes">
            <SectionHeader
              kicker="Shapes"
              title="Bed geometry"
              lede="Same treatment language — different footprints for the section."
            />
            <AesBedShapes />
          </div>
        </div>
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
