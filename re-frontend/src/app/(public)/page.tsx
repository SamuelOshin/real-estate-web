import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { getProperties } from "@/features/properties/api";
import { PropertyCard } from "@/features/properties/components/PropertyCard";
import { HeroSearchConsole } from "@/features/properties/components/HeroSearchConsole";
import { HomeInspectionBooking } from "@/features/inquiries/components/HomeInspectionBooking";
import { Card } from "@/components/ui";
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from "@/components/motion";

const stats = [
  {
    title: "Capital Secured",
    value: "\u20A618.4B+",
    desc: "Land assets transacted with pristine documentation",
  },
  {
    title: "Allocated Owners",
    value: "4,850+",
    desc: "Verified landowners physically handed deeds & beacons",
  },
  {
    title: "Integrity Record",
    value: "100%",
    desc: "Zero court demolitions & zero title revocations",
  },
  {
    title: "Serviced Estates",
    value: "38",
    desc: "Master-planned communities active & inhabited",
  },
];

const trustPillars = [
  {
    title: "100% Verified Titles",
    desc: "Every plot undergoes multi-stage cadastral registry searches at Alausa (Lagos) or AGIS (Abuja) before onboarding. Zero litigation exposure guaranteed.",
    footer: "Lawyer-Reviewed Deeds",
    iconName: "verified",
    iconColor: "text-verified",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Zero Omo-Onile Harassment",
    desc: "Estates are fortified with perimeter walls, gatehouses, and registered sovereign legal backing. No unauthorized foundation or community taxes.",
    footer: "Fortified Boundaries",
    iconName: "fence",
    iconColor: "text-secondary",
    bgColor: "bg-blue-50",
  },
  {
    title: "Physical Instant Allocation",
    desc: "No paper promises. Once initial obligations are met, your specific corner piece and numbered concrete beacon pegs are anchored physically on site.",
    footer: "Numbered Beacon Pegs",
    iconName: "pin_drop",
    iconColor: "text-primary",
    bgColor: "bg-surface-tint",
  },
  {
    title: "Diaspora Concierge Desk",
    desc: "Live 4K drone video inspections, solicitor escrow agreements, and tracked DHL worldwide delivery of original deeds to the UK, US, Canada, and EU.",
    footer: "DHL Global Courier",
    iconName: "flight_takeoff",
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];

const corridors = [
  {
    name: "Epe Corridor",
    badge: "+45% Annual Rise",
    desc: "Direct proximity to Alaro City, Lekki Free Zone & Dangote Refinery.",
    count: "Explore 38 Plots",
    href: "/properties?corridor=epe",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASR1WgMfs_AMIL9Yox7aJYKR7kBsobh9TsXPR7gXDlmsGS8i9Z4kfZ2mSZnjq7vwvaA5ejTB6dBCh1y55W1Wdg6HmexgwSMT2fSreCv2r03rXiiTkqOqiPT1z3HBLeJEavzvPQ4qyfzt0J0ADyLHCv5fr4QpcrOmgJUg6Dd59URKSSj3r37hSWJ7Fq97Bk08o5jgI7M0aIIAPU5wHd8Wt84NFFfoZ9PitRkB9gYTfMT-3moavU70TkKg",
  },
  {
    name: "Ibeju-Lekki Coastal",
    badge: "Deep Sea Port",
    desc: "Anchored by the Lekki Deep Sea Port and proposed international airport.",
    count: "Explore 24 Plots",
    href: "/properties?corridor=ibeju",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCk5c3EwIcwLVpicTIbKFnWdBiaChu1UihCDVIzRlDiWjLvL5M3cuVsI36teaf5enrm6I2eKXFBuKEkIXf77L4CkUKuoPIewv08tWlGvQ3fjVIP5y2VByM70fnln_uDWD_juamYKB6UzgIp_UI6XwrGO0jIr2ylqXFUnX82FS5HqYRs0nYiLjQBDRbmEXmbfsR7ptcl8LpbXGJmNnCzpV05_zhggcMu5oFLDc0iaNkoybcZ4OZR7H6_-Q",
  },
  {
    name: "Guzape, Abuja",
    badge: "Diplomatic FCT",
    desc: "Sovereign administrative stability, elite zoning, and premier capital yields.",
    count: "Explore 19 Plots",
    href: "/properties?corridor=guzape",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcd36a8shYOm1D23_CGUdav7KU0-XUGKR73RMR81XFf4CyIv_WTkckQhTVSNiBER_2SeBTRpSIF6iokrc_IdWkbCZqUvXOuFdK_8aiA-f2OwRpPhBCS92kB0Oi-oUEXN03JBEvvbh97ezbiz2Rw_21-zHBFFx_1Y6qL8Q76vZDmMFtfKQhQdH9S_ynWZyjEG_-RJujGb0mFCZwv2W2QiZymFkvnfdnb4-q134-J69leK-KAfTmyKnkqQ",
  },
  {
    name: "Ibadan Rail Corridor",
    badge: "High ROI Entry",
    desc: "Anchored by the standard gauge train terminus and Inland Dry Port logistics.",
    count: "Explore 42 Plots",
    href: "/properties?corridor=moniya",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9earuiO0i327TQRk30DGTuE9rVjFPj9wBal5MpUCbh04Qmxc2X4tu1G4SYRLCbQfxvBq2WLFARSoFMVQxPDWyLtCXat528cjcUQqHR5aFjYUMTkYphIJQ8J0xx1-q4FHMuJr6YtOUYS4XJdKTywcwnnVTVNM4so_Q99Sq6KTSHF2Xkusx44esKWQoPu1p744bwGySfT2wf2EuMgzpp-v6Q9TNhvECnviw14pBY8xwlJH7FD5KMm73Mw",
  },
];

const steps = [
  {
    num: "01",
    title: "Select Plot & Verify",
    desc: "Choose your estate and plot dimensions (300 SQM, 500 SQM, or Commercial). Review registered survey plans and cadastral coordinates.",
  },
  {
    num: "02",
    title: "Inspect (Live or Drone)",
    desc: "Take our weekend chauffeur pickup in Lagos/Abuja, or attend a private 1-on-1 4K live drone walkthrough directly over Zoom/WhatsApp from abroad.",
  },
  {
    num: "03",
    title: "Subscribe & Remit",
    desc: "Submit your subscription form. Payments are transacted into vetted corporate institutional escrow accounts with instant official receipts.",
  },
  {
    num: "04",
    title: "Allocation & Deeds",
    desc: "Concrete corner beacon stones installed on-site. Receive your Deed of Assignment, Contract of Sale, and Survey Plan delivered via DHL globally.",
  },
];

const testimonials = [
  {
    quote:
      "\"Buying land in Lagos from London used to terrify me. Prison Gihon gave me complete peace of mind. My lawyer verified their Governor's Consent at Alausa within 48 hours, and original DHL docs arrived at my address in Manchester.\"",
    name: "Dr. Kunle Adeyemi",
    role: "NHS Consultant • Manchester, UK",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBD62oRrjSyNxEWttkXfKFtQ5vv9Hc2IWGPumQs5ynMQaWAfhewJ7j1W7V6pRm3RovugglVBmGs5Cz6peunwGWJRncYuhHI8IxMN6uKb8akciQcoVG9fVNzmoZR1i2k9Roz3SmulPr6Pc5upedykb2zPfOV-xGSDhDE5G2RusF_7XoMW3BXMF-RwFrnSEgxm0TFNIT15nkfVjKTj1ISGGLQhy7eWuLkt0cZLIp6spP3FosBx6AsEAEWng",
  },
  {
    quote:
      "\"We purchased commercial plots at Oasis Greenfield in Epe. The 12-month payment plan was straightforward, and what impressed me was physical allocation—they physically escorted our family engineer to erect our concrete beacons.\"",
    name: "Mrs. Chinelo Okonkwo",
    role: "Senior Financial Analyst • Calgary, Canada",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaL3ILtIIJz0NYwfdd7SD1OShpmMM6UnTjV2vd9NaxVHHzbL4CjLqHy0MlqcJ-f7SgpHhOp5PksyIgHl8O1J8ES5_vDXwfFUVJq2k0hEdDXJ4fQFBmb49z5oJtrtRs6Km69GoqANtKg4ItPsoWBliZzzaECAkbj4z4HiGuKQqec3TjzPfg8ZrYf_cUFW3cVaIhWdJ7U3FJeiWqmgLXnAyzKqEYYuT9SRzc79PNmxUJlagTcX_PfCpAbg",
  },
  {
    quote:
      "\"I work in Victoria Island and have seen bad developers firsthand. Prison Gihon operates like a top-tier financial institution. Sovereign Heights in Guzape, Abuja is solid engineering with zero stress.\"",
    name: "Babatunde Fashanu",
    role: "Fintech Lead • Lekki, Lagos",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC25A9l-nMxjgH2h2jwgmJ_9WjKe4bk4aCbxwWjyecKDiNktz6uZtFt6KyffC6vlxbK3_C8LYfxzBddclcSPstsny4mTdQ-uKq-dy4tvqNeTji_DM6GHggnoqPZgiT-Hyl5M08MSaRUuzdPujPo0QPdkcq74YtHOkrIRR22l3C3_U-q3WjECh8Dv_fMMNtbMnsLH2dbYmyToGV_AsQsmEBfvdBA-OUBYtvP9rBZyTBGd8nGUIuARWPQww",
  },
];

export default async function HomePage() {
  const allProperties = await getProperties();
  const featuredProperties = allProperties.slice(0, 4);

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Full-Bleed Panoramic Hero & Integrated Search Console */}
      <section className="relative w-full bg-surface-card pb-16 sm:pb-20">
        <div className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between items-center text-center px-6 pt-14 sm:pt-20 pb-28 sm:pb-32 overflow-hidden bg-primary">
          {/* Panoramic Architecture Photography */}
          <Image
            src="/hero-estate.jpg"
            alt={`${siteConfig.name} Masterplanned Real Estate`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Full-Width Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/40" />

          {/* Top Micro-Pill */}
          <div className="relative z-10">
            <Link
              href="#inspection-booking"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/80 hover:bg-primary text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-2 transition-all group font-body"
            >
              <span className="w-5 h-5 rounded-full bg-verified/20 text-verified flex items-center justify-center text-[13px] group-hover:scale-110 transition-transform">
                ⚡
              </span>
              <span>Are you looking for verified land in Nigeria?</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Centered Editorial Headline & Subtitle */}
          <div className="relative z-10 max-w-5xl mx-auto my-auto py-6">
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[56px] text-white leading-[1.14] tracking-tight mb-5 drop-shadow-md">
              Own Secure Landed Property in Nigeria{" "}
              <span className="font-serif italic font-normal text-surface-tint">
                Without the Fear
              </span>{" "}
              of <span className="whitespace-nowrap">Omo-Onile</span> or Fraud.
            </h1>
            <p className="font-body text-base sm:text-lg lg:text-xl text-surface-tint max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              Rent, build, or invest in genuine plots with authenticated titles (C of O,
              Governor&apos;s Consent, Gazette) in vetted master-planned estates across Lagos, Abuja,
              Epe, and Ibadan.
            </p>
          </div>

          <div className="relative z-10 h-6" />
        </div>

        {/* Floating Search Console */}
        <HeroSearchConsole />
      </section>

      {/* Metrics / Stats Strip */}
      <section className="max-w-container mx-auto px-6 lg:px-12 py-16 w-full">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {stats.map((stat, idx) => (
            <StaggerItem key={idx} className="pt-4 sm:pt-0 sm:px-6 first:pl-0">
              <p className="text-[11px] font-bold text-secondary uppercase tracking-wider mb-1 font-body">
                {stat.title}
              </p>
              <div className="font-heading text-2xl lg:text-3xl font-extrabold text-primary">
                {stat.value}
              </div>
              <p className="text-xs text-text-muted mt-1 font-body">{stat.desc}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Featured Prime Landed Properties */}
      <section className="bg-surface-tint/40 border-y border-border py-16 lg:py-20" id="properties-section">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-1 font-body">
                  Authenticated Portfolio
                </span>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary">
                  Featured Prime Landed Properties
                </h2>
                <p className="font-body text-sm text-text-muted mt-1">
                  Cadastral-checked plots with instant physical deed allocation and beacon stones.
                </p>
              </div>
              <Link
                href="/properties"
                className="text-xs font-semibold text-secondary hover:text-secondary/80 flex items-center gap-1 group whitespace-nowrap self-start sm:self-end font-body"
              >
                <span>View all listings</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </FadeInWhenVisible>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <StaggerItem key={property.id}>
                <PropertyCard property={property} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* The Trust Blueprint */}
      <section className="max-w-container mx-auto px-6 lg:px-12 py-20" id="trust-blueprint">
        <FadeInWhenVisible direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-1.5 font-body">
              The Trust Blueprint
            </span>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary">
              Why Institutional &amp; Diaspora Buyers Choose Us
            </h2>
            <p className="font-body text-sm text-text-muted mt-2">
              Eliminating the four major hazards of Nigerian land acquisition: family title disputes,
              omo-onile levies, delayed allocations, and distance anxiety.
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, idx) => (
            <StaggerItem key={idx}>
              <Card elevation="resting" padding="md" className="flex flex-col justify-between h-full hover:shadow-2 transition-shadow">
                <div>
                  <div
                    className={`w-11 h-11 rounded-lg ${pillar.bgColor} ${pillar.iconColor} flex items-center justify-center mb-5`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {pillar.iconName}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-primary mb-2">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-xs text-text-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div
                  className={`mt-6 pt-4 border-t border-border text-[11px] font-semibold ${pillar.iconColor} flex items-center gap-1.5 font-body`}
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>{pillar.footer}</span>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Strategic Growth Corridors */}
      <section className="bg-surface-tint/40 border-y border-border py-16 lg:py-20" id="corridors-section">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-1 font-body">
                  High Appreciation Zones
                </span>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary">
                  Strategic Growth Corridors
                </h2>
                <p className="font-body text-sm text-text-muted mt-1">
                  Backed by major federal &amp; state infrastructure developments.
                </p>
              </div>
            </div>
          </FadeInWhenVisible>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {corridors.map((corridor, idx) => (
              <StaggerItem key={idx}>
                <Link
                  href={corridor.href}
                  className="group relative rounded-xl overflow-hidden shadow-1 hover:shadow-2 h-80 flex flex-col justify-end p-5 bg-primary cursor-pointer transition-all duration-300 block"
                >
                  <Image
                    src={corridor.imageUrl}
                    alt={corridor.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                  <div className="relative z-10 text-white">
                    <span className="px-2 py-0.5 rounded bg-secondary text-[10px] font-bold uppercase tracking-wider mb-2 inline-block font-body">
                      {corridor.badge}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-white mb-1">
                      {corridor.name}
                    </h3>
                    <p className="font-body text-xs text-surface-tint line-clamp-2 mb-3">
                      {corridor.desc}
                    </p>
                    <div className="flex items-center text-xs font-semibold text-surface-tint gap-1 group-hover:translate-x-1 transition-transform font-body">
                      <span>{corridor.count}</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4-Step Procedure */}
      <section className="max-w-container mx-auto px-6 lg:px-12 py-20" id="how-it-works">
        <FadeInWhenVisible direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-1.5 font-body">
              Streamlined Journey
            </span>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary">
              How to Acquire Your Plot in 4 Steps
            </h2>
            <p className="font-body text-sm text-text-muted mt-2">
              Transparent, documented, and fully secured at every stage.
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <StaggerItem key={idx}>
              <Card elevation="resting" padding="md" className="relative h-full hover:shadow-2 transition-shadow">
                <div className="font-heading text-3xl font-extrabold text-border mb-4">
                  {step.num}
                </div>
                <h3 className="font-heading font-bold text-base text-primary mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-xs text-text-muted leading-relaxed">
                  {step.desc}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Diaspora Banner */}
        <FadeInWhenVisible direction="up" delay={0.2}>
          <div className="mt-12 rounded-xl bg-primary text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[26px]">videocam</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white">
                  Living abroad in the UK, USA, or Canada?
                </h3>
                <p className="font-body text-xs text-surface-tint mt-0.5">
                  Over 2,100 diaspora clients completed their full inspection via live 4K drone before
                  releasing funds.
                </p>
              </div>
            </div>
            <Link
              href="#inspection-booking"
              className="px-5 py-2.5 rounded-lg bg-secondary hover:bg-secondary/90 text-white text-xs font-semibold whitespace-nowrap transition-colors font-body"
            >
              Request Drone Tour
            </Link>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Testimonials */}
      <section className="bg-surface-tint/40 border-y border-border py-20" id="testimonials">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-1 font-body">
                  Client Experiences
                </span>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary">
                  Over 4,800 Landowners Can&apos;t Be Wrong
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px] fill"
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-xs font-bold text-primary font-body">
                  4.96 / 5.0 Verified Satisfaction
                </span>
              </div>
            </div>
          </FadeInWhenVisible>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <StaggerItem key={idx}>
                <Card elevation="resting" padding="md" className="flex flex-col justify-between h-full hover:shadow-2 transition-shadow">
                  <div>
                    <div className="flex text-amber-500 mb-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-[16px] fill"
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <p className="font-body text-xs text-text-muted leading-relaxed italic mb-6">
                      {t.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-surface-tint">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="font-heading text-xs font-bold text-primary">{t.name}</p>
                      <p className="font-body text-[11px] text-text-muted">{t.role}</p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Call to Action / Inspection Booking */}
      <section className="max-w-container mx-auto px-6 lg:px-12 py-20" id="inspection-booking">
        <FadeInWhenVisible direction="up">
          <div className="bg-primary text-white rounded-2xl p-8 lg:p-12 shadow-3 border border-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Copy Column */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold w-fit mb-5 font-body">
                  <span className="material-symbols-outlined text-[16px] text-verified">
                    directions_car
                  </span>
                  <span>Complimentary Chauffeur Pickup Every Saturday</span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-white mb-4 leading-snug">
                  Ready to Secure Your Plot of Land with Verified Peace of Mind?
                </h2>
                <p className="font-body text-sm text-surface-tint leading-relaxed mb-6">
                  Schedule your inspection with certified property consultants. In-person chauffeur
                  trips from Ikoyi, Ikeja &amp; Abuja Central, or live video walkthroughs.
                </p>
                <div className="flex flex-col gap-3 font-body">
                  <div className="flex items-center gap-2.5 text-xs text-surface-tint">
                    <span className="material-symbols-outlined text-[18px] text-verified">
                      check_circle
                    </span>
                    <span>Free survey chart review and title coordinates validation</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-surface-tint">
                    <span className="material-symbols-outlined text-[18px] text-verified">
                      check_circle
                    </span>
                    <span>Zero omo-onile guarantee backed by institutional covenants</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-surface-tint">
                    <span className="material-symbols-outlined text-[18px] text-verified">
                      check_circle
                    </span>
                    <span>Receive a ₦100,000 reservation voucher upon inspection completion</span>
                  </div>
                </div>
              </div>

              {/* Clean Form Card */}
              <div className="lg:col-span-6">
                <HomeInspectionBooking />
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>
    </div>
  );
}
