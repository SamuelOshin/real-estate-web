import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { TeamMemberCard, type TeamMember } from "@/features/about";
import { Card } from "@/components/ui";

const metrics = [
  {
    label: "AUDITED ASSETS",
    value: "\u20A618.4B+",
    desc: "Land Value Secured & Cadastrally Documented",
    iconName: "account_balance",
    iconColor: "text-secondary",
  },
  {
    label: "ALLOCATED OWNERS",
    value: "4,850+",
    desc: "Physical Landowners Across Nigeria & Diaspora",
    iconName: "groups",
    iconColor: "text-secondary",
  },
  {
    label: "LEGAL RECORD",
    value: "100%",
    desc: "Zero Demolitions, Zero Revocations Since Inception",
    iconName: "gavel",
    iconColor: "text-verified",
  },
  {
    label: "PORTFOLIO",
    value: "38",
    desc: "Master-Planned Estates in Lagos, Abuja & Ibadan",
    iconName: "domain",
    iconColor: "text-secondary",
  },
  {
    label: "REGISTRY SPEED",
    value: "48-Hr",
    desc: "Alausa & AGIS Title Verification Turnaround",
    iconName: "timer",
    iconColor: "text-secondary",
  },
];

const teamMembers: TeamMember[] = [
  {
    name: "Arc. Babatunde Adeleke",
    role: "Co-Founder & Managing Director",
    certification: "FNIA CERTIFIED",
    bio: "Ex-Lagos State Ministry of Physical Planning consultant with 18+ years leading mega master-planned regional growth corridors across Lekki-Epe and Abuja.",
    tag: "18+ Yrs Urban Planning",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAG2we_A9eO0cP_Dul7xKDfDB01mY2IpN65A7L5T-9emO33sPZcCZegl-oPiG6-BG2bx_aM2Xh8XL7TsLqy9lRNFmMHmvyaepq7g0QfIay-ZaQgP3TlSyK1GMc4byR7T-3FSfVYej7S0M5BrbD2Y_SOlFscmS2vwujOGpHXCJoMaV4zLeookBoD2qH3Z-_Zy4F7k7miOBrueUCpW5PfuIRq-DkVvVHedi-xHPBS0WdGX5XIgnovNA5h_g",
  },
  {
    name: "Barr. Folashade Balogun, SAN",
    role: "Head of Legal Conveyancing",
    certification: "SENIOR ADVOCATE OF NIGERIA",
    bio: "Senior Advocate of Nigeria specializing in Lagos State Lands Registry title perfection, dispute pre-emption, and Alausa cadastral record reconciliation.",
    tag: "Deed Conveyancing Lead",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzspOARIG3jLY80m8P-yAl9Gq_HTjtthDBde33UdV8L5mhcR07O_7ljWutlVRIZo6VzfmQtEU4zaTXsd4TXdO8gimuBMZvqFcAIiU-aWAfhubPHrNK8CjefuOr6UNQA6M9oBoYb-iJRDvRtIj15XVq3kO8L3kA2JWz5i7LvxBsn0pZy-klT0zYd8jx8o8mQeIpXAJZVqrGfSj6Lo_ZfXq19uRX2r9j8eisc7TgZx-4e6yc059GG0J5Cg",
  },
  {
    name: "Engr. Chinedu Okafor",
    role: "Director of Cadastral Engineering",
    certification: "FNSE REGISTERED",
    bio: "Pioneered subterranean stormwater civil engineering and deep concrete drainage infrastructure in the high-yield Epe and Ibeju-Lekki corridors.",
    tag: "Cadastral Engineering",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDN59EvHtOxYW65bcHq5QdyPpF-DpvqKAzBx7gzi_UGUcLqktmq94f5t2ZBJhGyWO0168EilDQzZnZv1aJ-u61dTubRz6Orn9FtiItl33op4lHLFc2SIyLqkcoBgsIf-m7PdF3p-2N7jpMnlJbGqNLdhuBUzx01ERB-OyDk5PCu2qMtommu3FcRhhqit-ea_3PMY0UPvqG6qtSyzbOslvVOZPK4l8KNjLGktXLfDO3z6HKgmDfIHsBnkQ",
  },
  {
    name: "Zainab Al-Hassan, CFA",
    role: "Head of Diaspora Capital & Escrow",
    certification: "CHARTERED FINANCIAL ANALYST",
    bio: "Former Private Wealth Director in London and Abuja, overseeing multi-currency escrow facilities and secure offshore property remittance vehicles.",
    tag: "Diaspora Escrow Custody",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvckpWjuaoG2USJkshAzeV7yf3wAzUI_SHK_YLH8BxgPA3L6a09L7gIhVKogpr7Vz40RXJnDF1m0p14Oxwt5q45NYhMESnvbNDllRNVMAFsHhTrAhFORaed41_L3yp7HNhCUnLTa5Ub72uw90K80e98WkoPw_daiEPVwtebWzUJFWfExfN0KWa4LTvbZAK6QbDxq0h6jzn6KbUCnfUUBnkJTLODIpg15Vjl4laXT0aMkpQuP44y6osKw",
  },
];

const complianceSeals = [
  {
    title: "Lagos Lands Bureau",
    subtitle: "Alausa Title Search",
    badge: "STATE REGISTRY",
    iconName: "account_balance",
    iconColor: "text-primary",
  },
  {
    title: "AGIS Abuja",
    subtitle: "Geographic Systems",
    badge: "FCT REGISTRY",
    iconName: "map",
    iconColor: "text-secondary",
  },
  {
    title: "NIS Registered",
    subtitle: "Surveyors Institute",
    badge: "STATUTORY",
    iconName: "architecture",
    iconColor: "text-verified",
  },
  {
    title: "EFCC SCUML",
    subtitle: "AML Certified Firm",
    badge: "COMPLIANT",
    iconName: "shield_person",
    iconColor: "text-primary",
  },
  {
    title: "REDAN Member",
    subtitle: "Real Estate Dev. Assoc.",
    badge: "INSTITUTIONAL",
    iconName: "apartment",
    iconColor: "text-secondary",
  },
  {
    title: "FIABCI Global",
    subtitle: "Intl. Federation",
    badge: "ACCREDITED",
    iconName: "public",
    iconColor: "text-verified",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Breadcrumb & Top Eyebrow */}
      <section className="w-full border-b border-border bg-surface-card py-3 px-4 md:px-6">
        <div className="max-w-container mx-auto flex flex-wrap items-center justify-between gap-2">
          <nav className="flex items-center gap-1 font-body text-label-md text-text-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-primary font-semibold">About Us</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-label-caps font-body tracking-wider uppercase">
            <span className="material-symbols-outlined text-sm text-verified">verified</span>
            <span>Institutional Trust &amp; Land Governance Since 2016</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-container mx-auto relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block font-body text-label-caps text-secondary uppercase tracking-widest mb-3">
              The Sovereign Doctrine
            </span>
            <h1 className="font-heading font-extrabold text-display-mobile md:text-headline-xl lg:text-display text-primary tracking-tight mb-6">
              Pioneering Transparency &amp; Security in Nigerian Landed Property Acquisition
            </h1>
            <p className="font-body text-body-lg text-text-muted max-w-3xl leading-relaxed">
              Founded on an uncompromising principle: eliminating title insecurity, arbitrary
              community levies (&ldquo;omo-onile&rdquo;), and delayed physical allocation for
              residential home builders and global diaspora investors.
            </p>
          </div>

          {/* Credibility Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
            {metrics.map((m, idx) => (
              <Card key={idx} elevation="resting" padding="md" className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`material-symbols-outlined ${m.iconColor}`}>{m.iconName}</span>
                    <span className="font-body text-label-caps text-text-muted">{m.label}</span>
                  </div>
                  <p className="font-heading text-price-display font-extrabold text-primary">
                    {m.value}
                  </p>
                </div>
                <p className="font-body text-body-sm text-text-muted mt-2">{m.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section: The Genesis & The Sovereign Charter */}
      <section className="w-full bg-surface-tint/50 border-y border-border py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-1.5 text-secondary font-body text-label-caps uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">history_edu</span>
              <span>Institutional Narrative</span>
            </div>

            <h2 className="font-heading font-bold text-headline-xl text-primary">
              The Genesis: Why We Redefined Nigerian Real Estate
            </h2>

            <div className="font-body text-body-md text-text-muted flex flex-col gap-4 leading-relaxed">
              <p>
                For decades, land acquisition in Nigeria has been fraught with structural
                uncertainty. Genuine investors and hard-working diaspora professionals routinely
                encountered overlapping survey plans, unregularized family claims, unregistered
                excisions, and extortionate &ldquo;omo-onile&rdquo; community interference at
                construction sites.
              </p>
              <p>
                {siteConfig.name} was established by a coalition of registered town planners, real
                estate conveyancing litigators, and cadastral surveyors to permanently solve this
                breakdown of trust.
              </p>
              <p>
                Before allocating a single square meter, our rigorous legal mandate requires:
                red-copy Surveyor-General vetted layout plans, government gazette confirmation,
                statutory excision gazette validation, and independent title searches at the Alausa
                Lands Registry or AGIS in Abuja. We assume 100% of title due-diligence liability,
                securing every acquisition through institutional escrow facilities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Card elevation="resting" padding="md" className="bg-surface-card">
                <div className="w-10 h-10 rounded-lg bg-surface-tint flex items-center justify-center text-primary mb-3">
                  <span className="material-symbols-outlined">explore</span>
                </div>
                <h4 className="font-heading text-headline-sm font-bold text-primary mb-1">
                  GPS Cadastral Beacons
                </h4>
                <p className="font-body text-body-sm text-text-muted">
                  Every plot carries surveyor-general numbered coordinates charted on statutory
                  GIS registries.
                </p>
              </Card>

              <Card elevation="resting" padding="md" className="bg-surface-card">
                <div className="w-10 h-10 rounded-lg bg-surface-tint flex items-center justify-center text-primary mb-3">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <h4 className="font-heading text-headline-sm font-bold text-primary mb-1">
                  Zero Omo-Onile Guarantee
                </h4>
                <p className="font-body text-body-sm text-text-muted">
                  We bear absolute indemnification against customary encroachment or unapproved site
                  demands.
                </p>
              </Card>
            </div>
          </div>

          {/* Right Column: The Sovereign Land Charter */}
          <div className="lg:col-span-5">
            <div className="bg-primary text-white p-6 sm:p-8 rounded-2xl shadow-2 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-2xl text-verified">shield</span>
                <span className="font-body text-label-caps uppercase tracking-widest text-surface-tint">
                  Non-Negotiable Protocols
                </span>
              </div>
              <h3 className="font-heading text-headline-lg font-bold text-white mb-6">
                Our Sovereign Land Charter
              </h3>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center font-heading text-label-md font-bold mt-0.5">
                    1
                  </span>
                  <div>
                    <h5 className="font-heading text-headline-sm font-semibold text-white text-base">
                      100% Dry Table Land Verification
                    </h5>
                    <p className="font-body text-body-sm text-surface-tint mt-1 leading-relaxed">
                      Exhaustive soil resistivity and topography surveys before acquisition,
                      ensuring no swamp reclamation surprises.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center font-heading text-label-md font-bold mt-0.5">
                    2
                  </span>
                  <div>
                    <h5 className="font-heading text-headline-sm font-semibold text-white text-base">
                      Freehold, C of O, or Governor’s Consent Only
                    </h5>
                    <p className="font-body text-body-sm text-surface-tint mt-1 leading-relaxed">
                      We do not trade on unratified excisions, pending court judgments, or
                      unregistered customary concessions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center font-heading text-label-md font-bold mt-0.5">
                    3
                  </span>
                  <div>
                    <h5 className="font-heading text-headline-sm font-semibold text-white text-base">
                      Zero Cash Handouts to Non-State Actors
                    </h5>
                    <p className="font-body text-body-sm text-surface-tint mt-1 leading-relaxed">
                      Full legal fencing, perimeter gatehouses, and institutional perimeter
                      policing on every layout.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center font-heading text-label-md font-bold mt-0.5">
                    4
                  </span>
                  <div>
                    <h5 className="font-heading text-headline-sm font-semibold text-white text-base">
                      Concrete Physical Handover with Numbered Beacons
                    </h5>
                    <p className="font-body text-body-sm text-surface-tint mt-1 leading-relaxed">
                      Immediate pegging and surveyor handover certificates issued within 14 days of
                      final consideration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center font-heading text-label-md font-bold mt-0.5">
                    5
                  </span>
                  <div>
                    <h5 className="font-heading text-headline-sm font-semibold text-white text-base">
                      Global DHL Delivery of Original Title Deeds
                    </h5>
                    <p className="font-body text-body-sm text-surface-tint mt-1 leading-relaxed">
                      Physical deeds, stamped survey copies, and deed of assignment sent anywhere
                      worldwide via insured express transit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="w-full py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-body text-label-caps text-secondary uppercase tracking-widest">
              Our Guiding Pillars
            </span>
            <h2 className="font-heading text-headline-xl font-bold text-primary mt-2">
              Built Upon Unyielding Institutional Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mission */}
            <Card elevation="resting" padding="lg" className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-tint flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-2xl">track_changes</span>
                </div>
                <span className="font-body text-label-caps text-secondary uppercase tracking-wider">
                  Strategic Mission
                </span>
                <h3 className="font-heading text-headline-md font-bold text-primary mt-1 mb-3">
                  De-risking Land Ownership
                </h3>
                <p className="font-body text-body-md text-text-muted leading-relaxed">
                  To empower every Nigerian family and diaspora investor to own genuine,
                  authenticated landed assets without anxiety, extortion, or administrative
                  ambiguity.
                </p>
              </div>
              <Link
                href="/contact"
                className="pt-6 mt-6 border-t border-border inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-body text-label-lg font-semibold"
              >
                <span>Learn our title diligence framework</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </Card>

            {/* Vision */}
            <Card elevation="resting" padding="lg" className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-tint flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-2xl">visibility</span>
                </div>
                <span className="font-body text-label-caps text-secondary uppercase tracking-wider">
                  Continental Outlook
                </span>
                <h3 className="font-heading text-headline-md font-bold text-primary mt-1 mb-3">
                  Sub-Saharan Cadastral Standard
                </h3>
                <p className="font-body text-body-md text-text-muted leading-relaxed">
                  To be Sub-Saharan Africa’s most trusted cadastral land infrastructure and
                  residential master-development brand, benchmarked against global sovereign land
                  registries.
                </p>
              </div>
              <Link
                href="/properties"
                className="pt-6 mt-6 border-t border-border inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-body text-label-lg font-semibold"
              >
                <span>Explore our master layouts</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </Card>

            {/* The Four Tenets */}
            <Card elevation="resting" padding="lg" className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-tint flex items-center justify-center text-verified mb-4">
                  <span className="material-symbols-outlined text-2xl">verified_user</span>
                </div>
                <span className="font-body text-label-caps text-secondary uppercase tracking-wider">
                  Our DNA
                </span>
                <h3 className="font-heading text-headline-md font-bold text-primary mt-1 mb-3">
                  The Four Tenets
                </h3>
                <ul className="font-body text-body-md text-text-muted flex flex-col gap-2.5 mt-2">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-verified">
                      check_circle
                    </span>
                    <span>
                      <strong className="text-text-primary">1. Radical Veracity:</strong> Truth without omission.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-verified">
                      check_circle
                    </span>
                    <span>
                      <strong className="text-text-primary">2. Institutional Rigor:</strong> Cadastral precision.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-verified">
                      check_circle
                    </span>
                    <span>
                      <strong className="text-text-primary">3. Investor Sovereignty:</strong> Bank escrow custody.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-verified">
                      check_circle
                    </span>
                    <span>
                      <strong className="text-text-primary">4. Prompt Execution:</strong> 14-day beacon handover.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-border inline-flex items-center gap-2 text-secondary font-body text-label-md">
                <span>Review corporate ethics manifesto</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership & Advisory Board */}
      <section className="w-full bg-surface-tint/40 border-y border-border py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-body text-label-caps text-secondary uppercase tracking-widest">
                Executive Governance
              </span>
              <h2 className="font-heading text-headline-xl font-bold text-primary mt-2">
                Leadership &amp; Legal Advisory Board
              </h2>
            </div>
            <p className="font-body text-body-md text-text-muted max-w-md">
              Guided by veteran town planners, Senior Advocates of Nigeria, registered civil
              engineers, and certified investment fiduciaries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <TeamMemberCard key={idx} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Partners & Verification Seals */}
      <section className="w-full py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-container mx-auto">
          <div className="text-center mb-10">
            <span className="font-body text-label-caps text-secondary uppercase tracking-widest">
              Regulatory Compliance &amp; Verification Bodies
            </span>
            <h3 className="font-heading text-headline-lg font-bold text-primary mt-2">
              Institutional Affiliations &amp; Statutory Compliance Seals
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {complianceSeals.map((seal, idx) => (
              <Card
                key={idx}
                elevation="resting"
                padding="sm"
                className="flex flex-col items-center text-center justify-center gap-2 hover:border-secondary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-surface-tint flex items-center justify-center">
                  <span className={`material-symbols-outlined text-2xl ${seal.iconColor}`}>
                    {seal.iconName}
                  </span>
                </div>
                <div>
                  <span className="font-heading text-headline-sm text-xs font-bold text-primary block">
                    {seal.title}
                  </span>
                  <span className="font-body text-label-caps text-text-muted mt-0.5 block">
                    {seal.subtitle}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-tint text-secondary font-body text-label-caps font-semibold">
                  {seal.badge}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diaspora Engagement & Global Reach */}
      <section className="w-full bg-surface-tint/60 border-t border-border py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-container mx-auto">
          <div className="bg-surface-card rounded-3xl p-6 sm:p-10 border border-border shadow-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 text-secondary font-body text-label-caps uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">flight_takeoff</span>
                <span>Global Diaspora Protocol</span>
              </div>
              <h2 className="font-heading text-headline-xl font-bold text-primary">
                Trusted by 2,300+ Diaspora Investors in the UK, USA, Canada, UAE &amp; Europe
              </h2>
              <p className="font-body text-body-md text-text-muted leading-relaxed">
                Investing from abroad no longer requires sending funds to unverified relatives or
                relying on unverifiable assurances. Our institutional diaspora desk delivers
                bank-grade protection from your first inquiry to physical beacon allocation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex flex-col gap-1">
                  <span className="material-symbols-outlined text-secondary text-2xl">
                    videocam
                  </span>
                  <h5 className="font-heading text-headline-sm text-xs font-bold text-primary">
                    Live 4K Drone Audits
                  </h5>
                  <p className="font-body text-body-sm text-text-muted">
                    Direct aerial inspection walkthroughs scheduled across GMT, EST, and PST
                    timezones.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="material-symbols-outlined text-secondary text-2xl">
                    account_balance_wallet
                  </span>
                  <h5 className="font-heading text-headline-sm text-xs font-bold text-primary">
                    Dual-Currency Escrow
                  </h5>
                  <p className="font-body text-body-sm text-text-muted">
                    Settle in USD, GBP, EUR or NGN through audited solicitor escrow bank accounts.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="material-symbols-outlined text-secondary text-2xl">
                    local_shipping
                  </span>
                  <h5 className="font-heading text-headline-sm text-xs font-bold text-primary">
                    Insured Courier Delivery
                  </h5>
                  <p className="font-body text-body-sm text-text-muted">
                    Stamped deed of assignment and survey documents dispatched directly to your
                    doorstep.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 bg-surface p-6 sm:p-8 rounded-2xl border border-border">
              <div className="flex items-center justify-between">
                <span className="font-body text-label-caps text-text-muted uppercase">
                  Diaspora Support Line
                </span>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-verified opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-verified" />
                </span>
              </div>
              <h4 className="font-heading text-headline-sm font-bold text-primary">
                Schedule a Private Video Briefing with a Senior Partner
              </h4>
              <p className="font-body text-body-sm text-text-muted">
                Connect via Google Meet or Zoom with our conveyancers. We will display live Alausa
                coordinates, survey documentation, and drone layout telemetry for your target plot.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-primary text-white font-body text-label-lg hover:bg-primary-hover transition-colors shadow-1 mt-2"
              >
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                <span>Reserve Diaspora Consultation Slot</span>
              </Link>
              <div className="flex items-center justify-center gap-1.5 text-text-muted font-body text-label-caps pt-2">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>SSL Encrypted &bull; Institutional NDA Protected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="w-full bg-primary text-white py-16 md:py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-surface-tint mb-4 font-body">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span className="text-label-caps uppercase tracking-wider">
              Unconditional Title Security
            </span>
          </div>
          <h2 className="font-heading text-headline-xl font-bold text-white max-w-2xl mx-auto mb-4">
            Ready to Build or Invest with Complete Peace of Mind?
          </h2>
          <p className="font-body text-body-lg text-surface-tint max-w-xl mx-auto mb-8 leading-relaxed">
            Browse our catalog of verified dry tableland parcels in Epe, Ibeju-Lekki, Abuja, and
            Ibadan, or review title documentation with our senior conveyancing solicitors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-body">
            <Link
              href="/properties"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-secondary text-white font-body text-label-lg hover:bg-secondary/90 transition-colors shadow-2"
            >
              <span className="material-symbols-outlined">explore</span>
              <span>Explore Verified Land Listings</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-surface-card text-primary font-body text-label-lg hover:bg-surface-tint transition-colors shadow-2"
            >
              <span className="material-symbols-outlined">gavel</span>
              <span>Speak to a Senior Conveyancer</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
