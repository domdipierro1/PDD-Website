# PDD Cleaning Services — address/status, notes and footer fix
Updated files: `index.html`, `contact.html`, `styles.css`, `script.js`.

## index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>PDD Cleaning Services — Cleaning Services in Enfield & North London</title>
<meta name="description" content="End of tenancy cleaning, deep cleaning, builders cleans, exterior windows and jet washing across Enfield & North London." />
<meta property="og:title" content="PDD Cleaning Services — Cleaning Services in Enfield & North London" />
<meta property="og:description" content="End of tenancy cleaning, deep cleaning, builders cleans, exterior windows and jet washing across Enfield & North London." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://pddcleaningservices.co.uk" />
<meta property="og:image" content="https://pddcleaningservices.co.uk/logo.jpg" />
<link rel="icon" href="favicon.ico" />
<link rel="stylesheet" href="styles.css" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CleaningService",
  "name": "PDD Cleaning Services",
  "legalName": "PDD Services Limited",
  "url": "https://pddcleaningservices.co.uk",
  "logo": "https://pddcleaningservices.co.uk/logo.jpg",
  "telephone": "+447568273696",
  "email": "info@pddcleaningservices.co.uk",
  "areaServed": ["Enfield", "Southgate", "Winchmore Hill", "Bounds Green", "Palmers Green", "Wood Green", "Edmonton", "North London"],
  "description": "Cleaning services across Enfield and North London.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Cleaning services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "End of Tenancy Cleaning"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Deep Cleaning"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Oven Cleaning Add-on"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Interior Window Cleaning Add-on"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Exterior Window Cleaning"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Jet Washing"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Builders Clean"}}
    ]
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Enfield",
    "addressRegion": "London",
    "addressCountry": "GB"
  }
}
</script>
</head>
<body>
<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="index.html" aria-label="PDD Cleaning Services home">
      <img src="logo.jpg" alt="PDD Cleaning Services logo" />
    </a>
    <nav class="nav" aria-label="Main navigation">
      <a href="index.html">Home</a>
      <a href="services.html">Services</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="header-actions">
      <a class="phone-link" href="tel:07568273696">07568 273696</a>
      <a class="btn small" href="contact.html#quote-form">Get Quote</a>
      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>
      </button>
    </div>
  </div>
  <div class="container mobile-menu-shell" id="mobile-menu">
    <div class="mobile-menu-inner">
      <nav class="mobile-nav" aria-label="Mobile navigation">
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>
      <div class="mobile-cta-row">
        <a class="btn secondary" href="tel:07568273696">Call</a>
        <a class="btn" href="contact.html#quote-form">Get Quote</a>
      </div>
    </div>
  </div>
</header>
<main id="main-content">

<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy reveal">
      <div class="eyebrow">Local cleaning across Enfield & North London</div>
      <h1>Cleaning services across Enfield & North London</h1>
      <p class="lead">End of tenancy and deep cleaning, with oven and internal window add-ons. Exterior windows, jet washing and builders cleans also available.</p>
      <div class="hero-actions">
        <a class="btn" href="contact.html#quote-form">Get a Free Quote</a>
        <a class="btn secondary" href="tel:07568273696">Call / Message Us</a>
      </div>
      <div class="trust-row" aria-label="Trust points">
        <span class="trust-chip"><span>✓</span> Fully insured</span>
        <span class="trust-chip"><span>✓</span> Vetted cleaners</span>
        <span class="trust-chip"><span>✓</span> Clear quote before booking</span>
        <span class="trust-chip"><span>✓</span> 48-hour re-clean guarantee</span>
      </div>
    </div>
    <aside class="hero-form-card reveal" id="quote-form" aria-label="Quick quote form">
      <h2>Start your quote</h2>
      <p class="form-sub">Select what you need and send the basics. It only takes a minute.</p>
      <form class="quick-form flow-form" action="https://pdd-pink.vercel.app/api/website-enquiry" method="POST" data-progressive-quote-form>
        <input type="hidden" name="return_url" value="https://pddcleaningservices.co.uk/thank-you.html" />
        <input type="text" name="company" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <input type="hidden" name="email" value="" />
        <input type="hidden" name="property_size" value="" />
        <input type="hidden" name="service_needed" value="" data-service-needed />
        <input type="hidden" name="preferred_date" value="" data-date-field />

        <div class="flow-section is-active" data-flow-section="details">
          <div class="flow-step"><span>1</span> Your details</div>
          <div class="form-inline">
            <label class="form-label">Name
              <input type="text" name="name" autocomplete="name" required />
            </label>
            <label class="form-label">Phone number
              <input type="tel" name="phone" autocomplete="tel" required />
            </label>
          </div>
        </div>

        <div class="flow-section is-active" data-flow-section="services">
          <div class="flow-step"><span>2</span> What do you need?</div>
          <details class="service-dropdown" data-service-dropdown>
            <summary><span data-service-summary>Select service(s) and add-ons</span><strong>Choose</strong></summary>
            <div class="service-options">
              <label><input type="checkbox" value="End of Tenancy Cleaning" data-service-option /> End of Tenancy Cleaning</label>
              <label><input type="checkbox" value="Deep Cleaning" data-service-option /> Deep Cleaning</label>
              <label><input type="checkbox" value="Oven Cleaning Add-on" data-service-option /> Oven Cleaning Add-on</label>
              <label><input type="checkbox" value="Interior Window Cleaning Add-on" data-service-option /> Interior Window Cleaning Add-on</label>
              <label><input type="checkbox" value="Exterior Window Cleaning" data-service-option /> Exterior Window Cleaning</label>
              <label><input type="checkbox" value="Jet Washing" data-service-option /> Jet Washing</label>
              <label><input type="checkbox" value="Builders Clean" data-service-option /> Builders Clean</label>
            </div>
          </details>
          <p class="form-note left">Select one or more services. Add-ons can be included with end of tenancy or deep cleaning.</p>
        </div>

        <div class="flow-section is-waiting" data-flow-section="date">
          <div class="flow-step"><span>3</span> Preferred date</div>
          <label class="form-label">When would you like the work done?</label>
          <div class="date-picker" data-date-picker>
            <button class="date-trigger" type="button" data-date-trigger aria-haspopup="dialog" aria-expanded="false">
              <span data-date-label>Select preferred date</span>
              <span class="date-trigger-icon" aria-hidden="true">⌄</span>
            </button>
            <div class="calendar-popover" data-calendar hidden></div>
          </div>
          <p class="form-note left">Click anywhere in the date box to open the calendar.</p>
        </div>

        <div class="flow-section is-waiting" data-flow-section="address">
          <div class="flow-step"><span>4</span> Address / postcode</div>
          <label class="form-label" for="quote-address">Start typing your address or postcode</label>
          <div class="address-lookup" data-address-lookup>
            <input id="quote-address" type="text" name="postcode_area" autocomplete="off" placeholder="Start typing address or postcode" data-address-field data-address-input required aria-autocomplete="list" aria-expanded="false" />
            <div class="address-results" data-address-results role="listbox" hidden></div>
          </div>
          <p class="address-status" data-address-status>Start typing and choose the correct address if it appears. You can also type the full address manually.</p>
        </div>

        <div class="flow-section is-waiting" data-flow-section="notes">
          <div class="flow-step"><span>5</span> Enquiry notes</div>
          <div class="notes-field">
            <label class="form-label" for="quote-message">Anything else we should know?</label>
            <p class="scope-microcopy">Access, parking, keys, heavy staining, mould, rubbish, pets, timing issues or any special requirements.</p>
            <textarea id="quote-message" name="message"></textarea>
          </div>
          <label class="consent">
            <input type="checkbox" name="contact_consent" value="Agreed" required />
            <span>I agree for PDD Cleaning Services to contact me about my quote request.</span>
          </label>
          <button class="btn full" type="submit">Submit Enquiry</button>
          <p class="form-note">We’ll confirm the scope and quote before any booking is agreed.</p>
        </div>
      </form>
    </aside>
  </div>
</section>

<section class="section-white section-tight">
  <div class="container">
    <div class="section-header center reveal">
      <h2>Choose a service</h2>
      <p>Click a service to see what is included before you enquire.</p>
    </div>
    <div class="picker-grid">
      <a class="picker-card reveal" href="services.html#end-of-tenancy"><span class="icon-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span><span><strong>End of Tenancy Cleaning</strong><p>Checklist-based move-out cleaning for tenants, landlords and agents.</p></span></a>
      <a class="picker-card reveal" href="services.html#deep-cleaning"><span class="icon-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span><span><strong>Deep Cleaning</strong><p>A one-off clean for homes that need a proper reset.</p></span></a>
      <a class="picker-card reveal" href="services.html#builders-clean"><span class="icon-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span><span><strong>Builders Clean</strong><p>After-renovation dust, surfaces and final clean-up.</p></span></a>
      <a class="picker-card reveal" href="services.html#exterior-windows"><span class="icon-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span><span><strong>Exterior Windows</strong><p>External window cleaning for suitable properties.</p></span></a>
      <a class="picker-card reveal" href="services.html#jet-washing"><span class="icon-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span><span><strong>Jet Washing</strong><p>Patios, driveways, paths and outdoor surfaces.</p></span></a>
      <a class="picker-card reveal" href="services.html#add-ons"><span class="icon-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span><span><strong>Oven & Interior Window Add-ons</strong><p>Add to end of tenancy or deep cleaning where needed.</p></span></a>
    </div>
  </div>
</section>

<section class="section-soft section-tight">
  <div class="container">
    <div class="section-header center reveal">
      <h2>Why book with PDD?</h2>
      <p>Simple communication, clear scope and a proper checklist before work starts.</p>
    </div>
    <div class="grid grid-4 proof-grid">
      <article class="card proof-card reveal"><h3>Clear quote</h3><p>We confirm the service, area, access and condition before booking.</p></article>
      <article class="card proof-card reveal"><h3>Vetted cleaners</h3><p>Jobs are fulfilled by cleaners reviewed before being assigned work.</p></article>
      <article class="card proof-card reveal"><h3>Checklist-led</h3><p>Each service has a defined scope so expectations are clearer.</p></article>
      <article class="card proof-card reveal"><h3>48-hour guarantee</h3><p>If an agreed area is missed, contact us within 48 hours with photos.</p></article>
    </div>
  </div>
</section>

<section class="section-white section-tight">
  <div class="container">
    <div class="section-header center reveal"><h2>How it works</h2></div>
    <div class="grid grid-3">
      <article class="card step-card reveal"><div class="step-number">1</div><h3>Send a quick enquiry</h3><p>Tell us the service, area and when you need it.</p></article>
      <article class="card step-card reveal"><div class="step-number">2</div><h3>We confirm the quote</h3><p>You receive a clear quote and what is included.</p></article>
      <article class="card step-card reveal"><div class="step-number">3</div><h3>The clean is completed</h3><p>A vetted cleaner attends and works to the agreed checklist.</p></article>
    </div>
  </div>
</section>

<section class="section-soft section-tight">
  <div class="container center-text reveal">
    <h2>Areas covered</h2>
    <p class="lead" style="margin-inline:auto;">Enfield, Southgate, Winchmore Hill, Bounds Green, Palmers Green, Wood Green, Edmonton and nearby North London areas.</p>
    <div class="area-list">
      <span class="area-chip">Enfield</span><span class="area-chip">Southgate</span><span class="area-chip">Winchmore Hill</span><span class="area-chip">Palmers Green</span><span class="area-chip">Wood Green</span><span class="area-chip">Edmonton</span>
    </div>
  </div>
</section>

<section class="section-white section-tight">
  <div class="container">
    <div class="review-placeholder reveal">
      <div><h2 style="font-size:1.6rem;">Google reviews</h2><p style="margin-top:8px;">Google reviews will appear here once available.</p></div>
    </div>
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <div class="cta-band reveal">
      <h2>Need a cleaning quote?</h2>
      <p>Send your name, number and what you need cleaned. We’ll reply with the next step.</p>
      <div class="hero-actions">
        <a class="btn secondary" href="contact.html#quote-form">Get a Free Quote</a>
        <a class="btn ghost" href="tel:07568273696">Call / Message Us</a>
      </div>
    </div>
  </div>
</section>

</main>
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <img src="logo.jpg" alt="PDD Cleaning Services" />
      <p>Cleaning services across Enfield & North London.</p>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <a href="services.html#end-of-tenancy">End of tenancy</a>
      <a href="services.html#deep-cleaning">Deep cleaning</a>
      <a href="services.html#builders-clean">Builders clean</a>
      <a href="services.html#exterior-windows">Exterior windows</a>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <a href="tel:07568273696">07568 273696</a>
      <a href="mailto:info@pddcleaningservices.co.uk">info@pddcleaningservices.co.uk</a>
      <a href="[GOOGLE BUSINESS PROFILE LINK]">Google Business Profile</a>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      <a href="privacy.html">Privacy Policy</a>
      <a href="terms.html">Terms of Service</a>
    </div>
  </div>
  <div class="container footer-bottom">
    PDD Cleaning Services is a trading name of PDD Services Limited, company number [COMPANY NUMBER], registered in England & Wales.
  </div>
</footer>
<script src="script.js"></script>
</body>
</html>

```

## contact.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Contact & Free Quote — PDD Cleaning Services</title>
<meta name="description" content="Send a quick cleaning enquiry for Enfield & North London." />
<meta property="og:title" content="Contact & Free Quote — PDD Cleaning Services" />
<meta property="og:description" content="Send a quick cleaning enquiry for Enfield & North London." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://pddcleaningservices.co.uk" />
<meta property="og:image" content="https://pddcleaningservices.co.uk/logo.jpg" />
<link rel="icon" href="favicon.ico" />
<link rel="stylesheet" href="styles.css" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CleaningService",
  "name": "PDD Cleaning Services",
  "legalName": "PDD Services Limited",
  "url": "https://pddcleaningservices.co.uk",
  "logo": "https://pddcleaningservices.co.uk/logo.jpg",
  "telephone": "+447568273696",
  "email": "info@pddcleaningservices.co.uk",
  "areaServed": ["Enfield", "Southgate", "Winchmore Hill", "Bounds Green", "Palmers Green", "Wood Green", "Edmonton", "North London"],
  "description": "Cleaning services across Enfield and North London.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Cleaning services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "End of Tenancy Cleaning"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Deep Cleaning"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Oven Cleaning Add-on"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Interior Window Cleaning Add-on"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Exterior Window Cleaning"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Jet Washing"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Builders Clean"}}
    ]
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Enfield",
    "addressRegion": "London",
    "addressCountry": "GB"
  }
}
</script>
</head>
<body>
<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="index.html" aria-label="PDD Cleaning Services home">
      <img src="logo.jpg" alt="PDD Cleaning Services logo" />
    </a>
    <nav class="nav" aria-label="Main navigation">
      <a href="index.html">Home</a>
      <a href="services.html">Services</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="header-actions">
      <a class="phone-link" href="tel:07568273696">07568 273696</a>
      <a class="btn small" href="contact.html#quote-form">Get Quote</a>
      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>
      </button>
    </div>
  </div>
  <div class="container mobile-menu-shell" id="mobile-menu">
    <div class="mobile-menu-inner">
      <nav class="mobile-nav" aria-label="Mobile navigation">
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>
      <div class="mobile-cta-row">
        <a class="btn secondary" href="tel:07568273696">Call</a>
        <a class="btn" href="contact.html#quote-form">Get Quote</a>
      </div>
    </div>
  </div>
</header>
<main id="main-content">

<section class="page-hero">
  <div class="container reveal">
    <div class="eyebrow">Free Quote</div>
    <h1>Send a quick enquiry.</h1>
    <p class="lead">Just your name, number and what you need cleaned. We’ll come back with a clear next step.</p>
  </div>
</section>

<section class="section-white section-tight">
  <div class="container contact-grid">
    <aside class="card contact-card reveal">
      <h2>Contact options</h2>
      <p class="lead" style="font-size:1rem;">For urgent jobs, call or message us.</p>
      <div class="contact-methods">
        <a class="contact-method" href="tel:07568273696">Call 07568 273696</a>
        <a class="contact-method" href="mailto:info@pddcleaningservices.co.uk">Email info@pddcleaningservices.co.uk</a>
        <a class="contact-method" href="https://wa.me/447568273696">WhatsApp / Message Us</a>
        <a class="contact-method" href="[GOOGLE BUSINESS PROFILE LINK]">Google Business Profile</a>
      </div>
    </aside>
    <div class="hero-form-card reveal" id="quote-form">
      <h2>Start your quote</h2>
      <p class="form-sub">Select what you need and send the basics. It only takes a minute.</p>
      <form class="quick-form flow-form" action="https://pdd-pink.vercel.app/api/website-enquiry" method="POST" data-progressive-quote-form>
        <input type="hidden" name="return_url" value="https://pddcleaningservices.co.uk/thank-you.html" />
        <input type="text" name="company" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <input type="hidden" name="email" value="" />
        <input type="hidden" name="property_size" value="" />
        <input type="hidden" name="service_needed" value="" data-service-needed />
        <input type="hidden" name="preferred_date" value="" data-date-field />

        <div class="flow-section is-active" data-flow-section="details">
          <div class="flow-step"><span>1</span> Your details</div>
          <div class="form-inline">
            <label class="form-label">Name
              <input type="text" name="name" autocomplete="name" required />
            </label>
            <label class="form-label">Phone number
              <input type="tel" name="phone" autocomplete="tel" required />
            </label>
          </div>
        </div>

        <div class="flow-section is-active" data-flow-section="services">
          <div class="flow-step"><span>2</span> What do you need?</div>
          <details class="service-dropdown" data-service-dropdown>
            <summary><span data-service-summary>Select service(s) and add-ons</span><strong>Choose</strong></summary>
            <div class="service-options">
              <label><input type="checkbox" value="End of Tenancy Cleaning" data-service-option /> End of Tenancy Cleaning</label>
              <label><input type="checkbox" value="Deep Cleaning" data-service-option /> Deep Cleaning</label>
              <label><input type="checkbox" value="Oven Cleaning Add-on" data-service-option /> Oven Cleaning Add-on</label>
              <label><input type="checkbox" value="Interior Window Cleaning Add-on" data-service-option /> Interior Window Cleaning Add-on</label>
              <label><input type="checkbox" value="Exterior Window Cleaning" data-service-option /> Exterior Window Cleaning</label>
              <label><input type="checkbox" value="Jet Washing" data-service-option /> Jet Washing</label>
              <label><input type="checkbox" value="Builders Clean" data-service-option /> Builders Clean</label>
            </div>
          </details>
          <p class="form-note left">Select one or more services. Add-ons can be included with end of tenancy or deep cleaning.</p>
        </div>

        <div class="flow-section is-waiting" data-flow-section="date">
          <div class="flow-step"><span>3</span> Preferred date</div>
          <label class="form-label">When would you like the work done?</label>
          <div class="date-picker" data-date-picker>
            <button class="date-trigger" type="button" data-date-trigger aria-haspopup="dialog" aria-expanded="false">
              <span data-date-label>Select preferred date</span>
              <span class="date-trigger-icon" aria-hidden="true">⌄</span>
            </button>
            <div class="calendar-popover" data-calendar hidden></div>
          </div>
          <p class="form-note left">Click anywhere in the date box to open the calendar.</p>
        </div>

        <div class="flow-section is-waiting" data-flow-section="address">
          <div class="flow-step"><span>4</span> Address / postcode</div>
          <label class="form-label" for="quote-address">Start typing your address or postcode</label>
          <div class="address-lookup" data-address-lookup>
            <input id="quote-address" type="text" name="postcode_area" autocomplete="off" placeholder="Start typing address or postcode" data-address-field data-address-input required aria-autocomplete="list" aria-expanded="false" />
            <div class="address-results" data-address-results role="listbox" hidden></div>
          </div>
          <p class="address-status" data-address-status>Start typing and choose the correct address if it appears. You can also type the full address manually.</p>
        </div>

        <div class="flow-section is-waiting" data-flow-section="notes">
          <div class="flow-step"><span>5</span> Enquiry notes</div>
          <div class="notes-field">
            <label class="form-label" for="quote-message">Anything else we should know?</label>
            <p class="scope-microcopy">Access, parking, keys, heavy staining, mould, rubbish, pets, timing issues or any special requirements.</p>
            <textarea id="quote-message" name="message"></textarea>
          </div>
          <label class="consent">
            <input type="checkbox" name="contact_consent" value="Agreed" required />
            <span>I agree for PDD Cleaning Services to contact me about my quote request.</span>
          </label>
          <button class="btn full" type="submit">Submit Enquiry</button>
          <p class="form-note">We’ll confirm the scope and quote before any booking is agreed.</p>
        </div>
      </form>
    </div>
  </div>
</section>

<section class="section-soft section-tight">
  <div class="container center-text reveal">
    <h2>What to include in your message</h2>
    <p class="lead" style="margin-inline:auto;">Service needed, postcode or area, property size and preferred date. Photos help if the property needs extra work.</p>
  </div>
</section>

</main>
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <img src="logo.jpg" alt="PDD Cleaning Services" />
      <p>Cleaning services across Enfield & North London.</p>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <a href="services.html#end-of-tenancy">End of tenancy</a>
      <a href="services.html#deep-cleaning">Deep cleaning</a>
      <a href="services.html#builders-clean">Builders clean</a>
      <a href="services.html#exterior-windows">Exterior windows</a>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <a href="tel:07568273696">07568 273696</a>
      <a href="mailto:info@pddcleaningservices.co.uk">info@pddcleaningservices.co.uk</a>
      <a href="[GOOGLE BUSINESS PROFILE LINK]">Google Business Profile</a>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      <a href="privacy.html">Privacy Policy</a>
      <a href="terms.html">Terms of Service</a>
    </div>
  </div>
  <div class="container footer-bottom">
    PDD Cleaning Services is a trading name of PDD Services Limited, company number [COMPANY NUMBER], registered in England & Wales.
  </div>
</footer>
<script src="script.js"></script>
</body>
</html>

```

## styles.css
```css
/* ============================================
   PDD Cleaning Services — lead-focused static site
   Neutral typography, simple conversion layout
   ============================================ */
:root {
  --blue: #0754ad;
  --blue-dark: #063d7f;
  --cyan: #18bcd0;
  --ink: #121826;
  --text: #273142;
  --muted: #667085;
  --line: #d8e5f1;
  --soft: #f4f9ff;
  --cyan-soft: #e9fbfd;
  --white: #ffffff;
  --paper: #ffffff;
  --radius-sm: 12px;
  --radius: 18px;
  --radius-lg: 28px;
  --shadow-sm: 0 8px 26px rgba(16,24,40,.06);
  --shadow: 0 18px 55px rgba(16,24,40,.10);
  --shadow-blue: 0 22px 65px rgba(7,84,173,.16);
  --max: 1180px;
  --ease: cubic-bezier(.22,1,.36,1);
}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:98px}body{margin:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:var(--text);background:var(--soft);line-height:1.55;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}img{display:block;max-width:100%;height:auto}a{text-decoration:none;color:inherit}button,input,textarea,select{font:inherit}button,a,input,textarea,select{-webkit-tap-highlight-color:transparent}:focus-visible{outline:3px solid rgba(24,188,208,.55);outline-offset:4px}.container{width:min(100% - 32px,var(--max));margin-inline:auto}.skip-link{position:absolute;left:-999px;top:12px;background:var(--blue);color:#fff;padding:10px 14px;border-radius:999px;z-index:9999}.skip-link:focus{left:12px}.center-text{text-align:center}.section-tight{padding:clamp(52px,7vw,82px) 0}.section-white{background:#fff}.section-soft{background:linear-gradient(180deg,#f7fbff,#eef8ff)}
.site-header{position:sticky;top:0;z-index:1000;background:rgba(255,255,255,.92);border-bottom:1px solid rgba(216,229,241,.9);backdrop-filter:blur(16px);box-shadow:0 8px 28px rgba(16,24,40,.055)}.header-inner{min-height:78px;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 0}.brand{display:flex;align-items:center;flex:0 0 auto}.brand img{width:130px}.nav{display:none;align-items:center;gap:26px;font-weight:750;font-size:.95rem}.nav a{position:relative;padding:9px 0;color:var(--ink)}.nav a:after{content:"";position:absolute;left:0;right:0;bottom:2px;height:2px;background:linear-gradient(90deg,var(--blue),var(--cyan));border-radius:99px;transform:scaleX(0);transform-origin:left;transition:transform .22s var(--ease)}.nav a:hover,.nav a.active{color:var(--blue)}.nav a:hover:after,.nav a.active:after{transform:scaleX(1)}.header-actions{display:flex;align-items:center;gap:10px}.phone-link{display:none;color:var(--blue);font-weight:800;white-space:nowrap}.menu-toggle{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border:1px solid var(--line);border-radius:14px;background:#fff;box-shadow:var(--shadow-sm);cursor:pointer}.menu-toggle svg{width:22px;height:22px;fill:none;stroke:var(--ink);stroke-width:2.4}.mobile-menu-shell{display:grid;grid-template-rows:0fr;transition:grid-template-rows .28s var(--ease);border-top:1px solid transparent}.mobile-menu-shell.is-open{grid-template-rows:1fr;border-top-color:var(--line)}.mobile-menu-inner{overflow:hidden}.mobile-nav{display:grid;padding:10px 0 14px}.mobile-nav a{padding:13px 4px;border-bottom:1px solid var(--line);font-weight:780}.mobile-nav a.active{color:var(--blue)}.mobile-cta-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 0 18px}.mobile-cta-row .btn{width:100%;min-height:44px;padding:0 12px;font-size:.9rem}@media(min-width:900px){.nav{display:flex}.phone-link{display:inline}.menu-toggle,.mobile-menu-shell{display:none}}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:50px;padding:0 22px;border:2px solid var(--blue);border-radius:999px;background:linear-gradient(135deg,var(--blue),var(--blue-dark));color:#fff;font-weight:850;box-shadow:0 14px 32px rgba(7,84,173,.22);cursor:pointer;transition:transform .2s var(--ease),box-shadow .2s ease,background .2s ease}.btn:hover{transform:translateY(-2px);box-shadow:0 20px 42px rgba(7,84,173,.27)}.btn.secondary{background:#fff;color:var(--blue);box-shadow:none}.btn.secondary:hover{background:var(--cyan-soft)}.btn.small{min-height:42px;padding:0 16px;font-size:.88rem}.btn.full{width:100%}.link-arrow{display:inline-flex;align-items:center;gap:7px;color:var(--blue);font-weight:850}.link-arrow:after{content:"→";transition:transform .2s var(--ease)}.link-arrow:hover:after{transform:translateX(4px)}
h1,h2,h3,h4{margin:0;color:var(--ink);letter-spacing:-.025em;line-height:1.06}h1{font-size:clamp(2.35rem,6vw,4.55rem);max-width:880px;font-weight:850}h2{font-size:clamp(1.85rem,4vw,3rem);font-weight:820}h3{font-size:clamp(1.1rem,2vw,1.35rem);font-weight:800}p{margin:0}.lead{margin-top:18px;color:var(--muted);font-size:clamp(1.03rem,2vw,1.22rem);max-width:680px;line-height:1.68}.eyebrow{display:inline-flex;align-items:center;gap:9px;margin-bottom:16px;padding:7px 13px;border:1px solid rgba(24,188,208,.25);border-radius:999px;background:rgba(24,188,208,.10);color:var(--blue-dark);font-size:.82rem;font-weight:850;letter-spacing:.01em}.eyebrow:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--cyan);box-shadow:0 0 0 5px rgba(24,188,208,.13)}.section-header{max-width:760px;margin-bottom:clamp(28px,4vw,42px)}.section-header.center{text-align:center;margin-inline:auto}.section-header p{margin-top:12px;color:var(--muted);font-size:1.02rem}.page-hero{position:relative;padding:clamp(58px,8vw,86px) 0;background:radial-gradient(circle at 86% 4%,rgba(24,188,208,.20),transparent 320px),linear-gradient(180deg,#fff,#f4f9ff)}.hero{padding:clamp(44px,7vw,78px) 0;background:radial-gradient(circle at 8% 0%,rgba(24,188,208,.18),transparent 330px),radial-gradient(circle at 92% 10%,rgba(7,84,173,.13),transparent 370px),linear-gradient(180deg,#fff,#f4f9ff)}.hero-grid{display:grid;grid-template-columns:1fr;gap:28px;align-items:center}.hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.trust-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}.trust-chip{display:inline-flex;align-items:center;gap:8px;padding:9px 12px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.86);color:var(--blue-dark);font-weight:750;font-size:.91rem;box-shadow:var(--shadow-sm)}.trust-chip span{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:rgba(24,188,208,.13);color:var(--blue);font-weight:900}.hero-form-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--shadow-blue);padding:clamp(22px,4vw,32px)}.hero-form-card h2{font-size:clamp(1.5rem,3vw,2.1rem)}.form-sub{margin-top:8px;color:var(--muted)}.quick-form{display:grid;gap:14px;margin-top:20px}.form-label{display:grid;gap:7px;font-weight:780;color:var(--ink);font-size:.93rem}input,textarea,select{width:100%;border:1px solid #cddbe8;border-radius:14px;background:#fff;color:var(--text);padding:13px 14px;outline:none;transition:border-color .2s ease,box-shadow .2s ease}textarea{min-height:108px;resize:vertical}input:focus,textarea:focus,select:focus{border-color:var(--blue);box-shadow:0 0 0 4px rgba(7,84,173,.10)}.consent{display:flex;gap:10px;align-items:flex-start;color:var(--muted);font-size:.9rem;line-height:1.45}.consent input{width:auto;margin-top:3px}.form-note{color:var(--muted);font-size:.88rem;text-align:center}.grid{display:grid;grid-template-columns:1fr;gap:18px}.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}.card{position:relative;background:#fff;border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow-sm);overflow:hidden;transition:transform .22s var(--ease),box-shadow .22s ease,border-color .22s ease}.card:hover{transform:translateY(-3px);box-shadow:var(--shadow);border-color:rgba(7,84,173,.2)}.picker-grid{display:grid;grid-template-columns:1fr;gap:14px}.picker-card{display:flex;gap:14px;align-items:flex-start;padding:18px;border:1px solid var(--line);border-radius:18px;background:#fff;box-shadow:var(--shadow-sm);transition:transform .2s var(--ease),box-shadow .2s ease,border-color .2s ease}.picker-card:hover{transform:translateY(-3px);box-shadow:var(--shadow);border-color:rgba(7,84,173,.22)}.picker-card strong{display:block;color:var(--ink);font-weight:850}.picker-card p{margin-top:5px;color:var(--muted);font-size:.94rem}.icon-badge{display:inline-grid;place-items:center;width:42px;height:42px;flex:0 0 auto;border-radius:14px;background:linear-gradient(135deg,var(--cyan-soft),var(--soft));color:var(--blue);border:1px solid rgba(24,188,208,.22)}.icon-badge svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}.proof-card,.step-card,.about-card{padding:22px}.proof-card p,.step-card p,.about-card p{margin-top:8px;color:var(--muted)}.step-number{width:44px;height:44px;display:grid;place-items:center;border-radius:14px;background:linear-gradient(135deg,var(--blue),var(--cyan));color:#fff;font-weight:900;margin-bottom:15px}.area-row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:22px}.area-chip,.meta-pill{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--blue-dark);font-weight:760;padding:9px 13px;box-shadow:var(--shadow-sm)}.review-placeholder{min-height:180px;border:1px solid var(--line);border-radius:var(--radius-lg);background:linear-gradient(135deg,rgba(7,84,173,.04),rgba(24,188,208,.07)),#fff;display:grid;place-items:center;text-align:center;padding:26px;color:var(--muted);font-weight:760;box-shadow:var(--shadow-sm)}.cta-panel{border-radius:var(--radius-lg);background:radial-gradient(circle at 88% 12%,rgba(24,188,208,.35),transparent 32%),linear-gradient(135deg,var(--blue),var(--blue-dark));color:#fff;padding:clamp(28px,5vw,46px);box-shadow:var(--shadow-blue)}.cta-panel h2{color:#fff}.cta-panel p{color:rgba(255,255,255,.82);margin-top:10px;max-width:650px}.cta-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.cta-panel .btn.secondary{background:#fff;color:var(--blue)}.detail-head{padding:clamp(24px,4vw,34px);border-bottom:1px solid var(--line)}.detail-head p{margin-top:12px;color:var(--muted);max-width:820px}.detail-head .btn{margin-top:18px}.detail-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.meta-pill{font-size:.86rem;padding:7px 10px;box-shadow:none;background:var(--soft)}.service-detail{margin-bottom:22px}.checklist-wrap{display:grid;grid-template-columns:1fr;gap:14px;padding:clamp(20px,4vw,30px)}.checklist-wrap.two{grid-template-columns:1fr}.checklist-box{border:1px solid var(--line);border-radius:16px;background:#fbfdff;padding:18px}.checklist-box h3{font-size:1.05rem;margin-bottom:10px}.checklist{list-style:none;padding:0;margin:0;display:grid;gap:8px}.checklist li{position:relative;padding-left:24px;color:var(--text);font-size:.95rem}.checklist li:before{content:"✓";position:absolute;left:0;top:0;color:var(--blue);font-weight:900}.scope-note{margin:0 clamp(20px,4vw,30px) clamp(20px,4vw,30px);padding:15px;border-radius:14px;background:var(--cyan-soft);border:1px solid rgba(24,188,208,.22);color:var(--blue-dark);font-weight:650}.about-grid,.contact-grid{display:grid;grid-template-columns:1fr;gap:22px}.contact-panel{padding:clamp(22px,4vw,30px)}.contact-panel p{margin-top:10px;color:var(--muted)}.contact-methods{display:grid;gap:10px;margin-top:20px}.contact-method{display:block;padding:14px;border:1px solid var(--line);border-radius:14px;background:#fff;color:var(--blue);font-weight:800}.legal-content{max-width:880px}.legal-card{padding:clamp(26px,5vw,42px)}.legal-card h2{font-size:clamp(1.25rem,3vw,1.8rem);margin-top:28px}.legal-card p,.legal-card li{color:var(--muted)}.legal-card ul{padding-left:22px}.site-footer{padding:48px 0 34px;background:radial-gradient(circle at 88% 8%,rgba(24,188,208,.18),transparent 30rem),var(--ink);color:rgba(255,255,255,.68)}.footer-grid{display:grid;grid-template-columns:1fr;gap:28px}.footer-brand img{width:142px;background:#fff;border-radius:14px;padding:8px}.footer-brand p{margin-top:14px;max-width:320px;color:rgba(255,255,255,.62)}.footer-col h4{margin:0 0 12px;color:#fff;font-size:.9rem;text-transform:uppercase;letter-spacing:.06em}.footer-col a,.footer-col span{display:block;margin-bottom:9px;color:rgba(255,255,255,.68);font-weight:600}.footer-col a:hover{color:var(--cyan)}.footer-bottom{margin-top:34px;padding-top:22px;border-top:1px solid rgba(255,255,255,.12);font-size:.86rem;color:rgba(255,255,255,.48)}.reveal{opacity:0;transform:translateY(20px);transition:opacity .62s var(--ease) var(--reveal-delay,0ms),transform .62s var(--ease) var(--reveal-delay,0ms)}.reveal.is-visible{opacity:1;transform:translateY(0)}
@media(min-width:680px){.picker-grid{grid-template-columns:repeat(2,1fr)}.grid-2{grid-template-columns:repeat(2,1fr)}.grid-4{grid-template-columns:repeat(2,1fr)}.checklist-wrap.two{grid-template-columns:repeat(2,1fr)}}@media(min-width:920px){.hero-grid{grid-template-columns:1.05fr .8fr}.grid-3{grid-template-columns:repeat(3,1fr)}.grid-4{grid-template-columns:repeat(4,1fr)}.about-grid{grid-template-columns:repeat(3,1fr)}.contact-grid{grid-template-columns:.82fr 1.18fr}.footer-grid{grid-template-columns:1.4fr 1fr 1fr 1fr}.picker-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:560px){.container{width:min(100% - 26px,var(--max))}.brand img{width:116px}.header-actions .btn{display:none}.header-inner{min-height:72px}.hero{padding-top:34px}.btn{width:100%}.hero-actions .btn{width:100%}.trust-chip{font-size:.84rem;padding:8px 10px}h1{font-size:clamp(2.05rem,10vw,2.8rem)}.lead{font-size:1rem}.picker-card{padding:15px}.section-tight{padding:46px 0}.page-hero{padding:50px 0}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}.reveal{opacity:1;transform:none;transition:none}.btn:hover,.card:hover,.picker-card:hover{transform:none}}


/* Progressive homepage/contact quote flow */
.honeypot{display:none!important;visibility:hidden!important;position:absolute!important;left:-9999px!important}
.flow-form{gap:16px}
.flow-section{display:grid;gap:12px;padding:14px;border:1px solid var(--line);border-radius:18px;background:#fbfdff;transition:opacity .2s ease,transform .2s ease}
.js-ready .flow-section.is-waiting{display:none}
.flow-step{display:flex;align-items:center;gap:9px;font-weight:850;color:var(--ink);font-size:.94rem}
.flow-step span{display:inline-grid;place-items:center;width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--cyan));color:#fff;font-size:.78rem;font-weight:900}
.form-inline{display:grid;grid-template-columns:1fr;gap:12px}
.service-dropdown{position:relative;border:1px solid #cddbe8;border-radius:15px;background:#fff;overflow:hidden}
.service-dropdown summary{list-style:none;cursor:pointer;padding:13px 14px;display:flex;align-items:center;justify-content:space-between;gap:12px;color:var(--text);font-weight:760}
.service-dropdown summary::-webkit-details-marker{display:none}
.service-dropdown summary strong{color:var(--blue);font-size:.9rem}
.service-dropdown[open] summary{border-bottom:1px solid var(--line)}
.service-options{display:grid;gap:0;padding:6px}
.service-options label{display:flex;align-items:flex-start;gap:10px;padding:10px;border-radius:12px;color:var(--text);font-weight:680;cursor:pointer}
.service-options label:hover{background:var(--soft)}
.service-options input{width:auto;margin-top:4px;accent-color:var(--blue)}
.form-note.left{text-align:left;margin-top:-4px}
.scope-microcopy{padding:12px;border-radius:14px;background:var(--cyan-soft);border:1px solid rgba(24,188,208,.22);color:var(--blue-dark);font-size:.88rem;line-height:1.45;font-weight:650}
.flow-section textarea{min-height:132px}
@media (min-width:680px){.form-inline{grid-template-columns:1fr 1fr}}
@media (prefers-reduced-motion:reduce){.flow-section{transition:none}}

/* Live address dropdown + custom calendar quote flow */
.date-picker,
.address-lookup{position:relative}
.date-trigger{width:100%;min-height:52px;border:1px solid #cddbe8;border-radius:16px;background:#fff;color:var(--muted);padding:0 14px;display:flex;align-items:center;justify-content:space-between;gap:12px;text-align:left;font-weight:760;cursor:pointer;box-shadow:0 8px 18px rgba(16,24,40,.035);transition:border-color .2s ease,box-shadow .2s ease,background .2s ease}
.date-trigger:hover{border-color:rgba(7,84,173,.35);background:#fbfdff}
.date-trigger:focus{border-color:var(--blue);box-shadow:0 0 0 4px rgba(7,84,173,.10)}
.date-trigger.has-value{color:var(--text);background:linear-gradient(180deg,#fff,#fbfdff)}
.date-trigger-icon{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:10px;background:var(--soft);color:var(--blue);font-size:1.1rem;font-weight:900;flex:0 0 auto}
.has-date-error .date-trigger{border-color:#d92d20;box-shadow:0 0 0 4px rgba(217,45,32,.10)}
.has-date-error [data-flow-section="date"]:after{content:"Please choose a preferred date.";color:#b42318;font-size:.86rem;font-weight:760}
.calendar-popover{position:absolute;z-index:30;top:calc(100% + 10px);left:0;right:0;background:#fff;border:1px solid var(--line);border-radius:22px;box-shadow:0 24px 70px rgba(16,24,40,.18);padding:14px;overflow:hidden}
.calendar-head{display:grid;grid-template-columns:40px 1fr 40px;align-items:center;gap:10px;margin-bottom:10px}
.calendar-head strong{text-align:center;color:var(--ink);font-size:1rem;font-weight:850}
.calendar-nav{width:38px;height:38px;border:1px solid var(--line);border-radius:12px;background:#fff;color:var(--blue);font-size:1.45rem;font-weight:800;line-height:1;cursor:pointer;transition:background .2s ease,border-color .2s ease}
.calendar-nav:hover{background:var(--soft);border-color:rgba(7,84,173,.22)}
.calendar-weekdays,.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
.calendar-weekdays{margin-bottom:6px}
.calendar-weekdays span{text-align:center;color:var(--muted);font-size:.72rem;font-weight:850;text-transform:uppercase;letter-spacing:.035em}
.calendar-day{height:38px;border:0;border-radius:12px;background:#fff;color:var(--text);font-weight:780;cursor:pointer;transition:background .18s ease,color .18s ease,box-shadow .18s ease}
.calendar-day:hover:not(:disabled){background:var(--cyan-soft);color:var(--blue-dark)}
.calendar-day.is-muted{color:#98a2b3}
.calendar-day.is-today{box-shadow:inset 0 0 0 2px rgba(24,188,208,.32)}
.calendar-day.is-selected{background:linear-gradient(135deg,var(--blue),var(--blue-dark));color:#fff;box-shadow:0 9px 18px rgba(7,84,173,.20)}
.calendar-day:disabled{color:#c6ced8;background:#f5f7fa;cursor:not-allowed}
.address-lookup input{padding-right:42px}
.address-results{position:absolute;z-index:28;top:calc(100% + 8px);left:0;right:0;max-height:278px;overflow:auto;background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:0 20px 58px rgba(16,24,40,.17);padding:8px}
.address-option{width:100%;border:0;border-radius:12px;background:#fff;color:var(--text);padding:11px 12px;text-align:left;font-weight:700;line-height:1.35;cursor:pointer}
.address-option:hover,.address-option:focus{background:var(--soft);color:var(--blue-dark)}
.address-status{margin-top:8px;color:var(--muted);font-size:.86rem;line-height:1.42}
.optional-label{display:inline-flex;margin-left:6px;padding:2px 7px;border-radius:999px;background:var(--soft);color:var(--muted);font-size:.75rem;font-weight:850;vertical-align:middle}
.flow-section textarea::placeholder{color:#667085;opacity:1}
.scope-microcopy{background:#f7fbff;color:var(--text);border-color:var(--line)}
@media(max-width:560px){.calendar-popover{position:fixed;left:14px;right:14px;top:auto;bottom:18px;max-height:78vh;overflow:auto}.calendar-day{height:42px}.address-results{max-height:240px}}


/* Final quote form refinements: address status, notes helper and footer spacing */
.hero{overflow:visible;padding-bottom:clamp(74px,9vw,116px)}
.hero-grid{align-items:start}
.hero-form-card{position:relative;z-index:2;margin-bottom:clamp(22px,4vw,54px)}
.quick-form{padding-bottom:10px}
.flow-section[data-flow-section="notes"]{margin-bottom:18px}
.notes-field{display:grid;gap:8px}
.flow-section .scope-microcopy{padding:0;background:transparent;border:0;color:#98a2b3;font-size:.86rem;line-height:1.45;font-weight:500;margin:0 0 2px}
.flow-section textarea[name="message"]{min-height:132px;background:#fff}
.address-status{color:#667085}
.site-footer{position:relative;z-index:0;clear:both;margin-top:0}
@media(max-width:560px){.hero{padding-bottom:84px}.hero-form-card{margin-bottom:38px}.flow-section[data-flow-section="notes"]{margin-bottom:24px}}

```

## script.js
```javascript
// PDD Cleaning Services — static site interactions
// Mobile menu, active navigation, reveal animations, progressive quote flow,
// custom date picker and live address dropdown shell.
document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var toggle = document.querySelector('.menu-toggle');
  var mobileShell = document.querySelector('.mobile-menu-shell');

  if (toggle && mobileShell) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileShell.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileShell.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileShell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        mobileShell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  var reveals = document.querySelectorAll('.reveal');
  reveals.forEach(function (el) {
    var group = el.closest('.grid, .picker-grid, .checklist-wrap, .trust-row, .area-row');
    if (group) {
      var groupReveals = Array.prototype.slice.call(group.querySelectorAll('.reveal'));
      var index = groupReveals.indexOf(el);
      if (index > -1) el.style.setProperty('--reveal-delay', Math.min(index * 70, 280) + 'ms');
    }
  });

  if (reduceMotion) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  document.body.classList.add('js-ready');

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function pad(number) {
    return String(number).padStart(2, '0');
  }

  function toISODate(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }

  function formatDisplayDate(date) {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  function fromISODate(value) {
    if (!value) return null;
    var parts = value.split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function closeOtherCalendars(currentPicker) {
    document.querySelectorAll('[data-date-picker]').forEach(function (picker) {
      if (picker !== currentPicker) {
        var popover = picker.querySelector('[data-calendar]');
        var trigger = picker.querySelector('[data-date-trigger]');
        if (popover) popover.hidden = true;
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function setupDatePicker(form, updateFlow) {
    var picker = form.querySelector('[data-date-picker]');
    if (!picker) return;

    var trigger = picker.querySelector('[data-date-trigger]');
    var label = picker.querySelector('[data-date-label]');
    var popover = picker.querySelector('[data-calendar]');
    var hidden = form.querySelector('[data-date-field]');
    var today = startOfDay(new Date());
    var state = {
      view: new Date(today.getFullYear(), today.getMonth(), 1)
    };

    function setSelected(date) {
      if (!hidden) return;
      hidden.value = toISODate(date);
      if (label) label.textContent = formatDisplayDate(date);
      if (trigger) trigger.classList.add('has-value');
      if (popover) popover.hidden = true;
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      form.classList.remove('has-date-error');
      updateFlow();
    }

    function renderCalendar() {
      if (!popover) return;
      var year = state.view.getFullYear();
      var month = state.view.getMonth();
      var monthName = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(state.view);
      var first = new Date(year, month, 1);
      var startOffset = (first.getDay() + 6) % 7; // Monday-first calendar
      var start = new Date(year, month, 1 - startOffset);
      var selectedDate = hidden && hidden.value ? fromISODate(hidden.value) : null;

      var html = '';
      html += '<div class="calendar-head">';
      html += '<button type="button" class="calendar-nav" data-calendar-prev aria-label="Previous month">‹</button>';
      html += '<strong>' + monthName + '</strong>';
      html += '<button type="button" class="calendar-nav" data-calendar-next aria-label="Next month">›</button>';
      html += '</div>';
      html += '<div class="calendar-weekdays"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>';
      html += '<div class="calendar-grid">';

      for (var i = 0; i < 42; i += 1) {
        var day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
        var isOtherMonth = day.getMonth() !== month;
        var isPast = startOfDay(day) < today;
        var isToday = toISODate(day) === toISODate(today);
        var isSelected = selectedDate && toISODate(day) === toISODate(selectedDate);
        var classes = ['calendar-day'];
        if (isOtherMonth) classes.push('is-muted');
        if (isToday) classes.push('is-today');
        if (isSelected) classes.push('is-selected');
        html += '<button type="button" class="' + classes.join(' ') + '" data-calendar-day="' + toISODate(day) + '"' + (isPast ? ' disabled' : '') + '>' + day.getDate() + '</button>';
      }

      html += '</div>';
      popover.innerHTML = html;
    }

    if (trigger) {
      trigger.addEventListener('click', function () {
        closeOtherCalendars(picker);
        renderCalendar();
        var willOpen = popover ? popover.hidden : false;
        if (popover) popover.hidden = !willOpen;
        trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    }

    if (popover) {
      popover.addEventListener('click', function (event) {
        var prev = event.target.closest('[data-calendar-prev]');
        var next = event.target.closest('[data-calendar-next]');
        var dayButton = event.target.closest('[data-calendar-day]');
        if (prev) {
          state.view = new Date(state.view.getFullYear(), state.view.getMonth() - 1, 1);
          renderCalendar();
          return;
        }
        if (next) {
          state.view = new Date(state.view.getFullYear(), state.view.getMonth() + 1, 1);
          renderCalendar();
          return;
        }
        if (dayButton && !dayButton.disabled) {
          var selected = fromISODate(dayButton.getAttribute('data-calendar-day'));
          if (selected) setSelected(selected);
        }
      });
    }

    document.addEventListener('click', function (event) {
      if (!picker.contains(event.target) && popover && !popover.hidden) {
        popover.hidden = true;
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && popover && !popover.hidden) {
        popover.hidden = true;
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function normaliseAddressResults(data) {
    var raw = [];
    if (Array.isArray(data)) raw = data;
    else if (data && Array.isArray(data.suggestions)) raw = data.suggestions;
    else if (data && Array.isArray(data.addresses)) raw = data.addresses;
    else if (data && Array.isArray(data.results)) raw = data.results;
    else if (data && Array.isArray(data.data)) raw = data.data;

    return raw.map(function (item) {
      if (typeof item === 'string') return { label: item, value: item };
      if (!item || typeof item !== 'object') return null;
      var label = item.label || item.address || item.formatted_address || item.line_1 || item.summary || item.text || item.description;
      var value = item.value || item.address || item.formatted_address || label;
      if (!label && item.line_1 && item.postcode) label = item.line_1 + ', ' + item.postcode;
      if (!value && label) value = label;
      return label ? { label: label, value: value } : null;
    }).filter(Boolean).slice(0, 10);
  }

  function setupAddressLookup(form, updateFlow) {
    var lookup = form.querySelector('[data-address-lookup]');
    if (!lookup) return;

    var input = lookup.querySelector('[data-address-input]');
    var results = lookup.querySelector('[data-address-results]');
    var status = form.querySelector('[data-address-status]');
    var endpoint = form.getAttribute('data-address-endpoint') || 'https://pdd-pink.vercel.app/api/address-autocomplete';
    var activeRequest = 0;
    var debounceTimer = null;

    function setStatus(message) {
      if (status) status.textContent = message;
    }

    function hideResults() {
      if (results) {
        results.hidden = true;
        results.innerHTML = '';
      }
      if (input) input.setAttribute('aria-expanded', 'false');
    }

    function showResults(items) {
      if (!results || !input) return;
      if (!items.length) {
        hideResults();
        setStatus('Keep typing, or enter the full address manually if it does not appear.');
        return;
      }
      results.innerHTML = items.map(function (item, index) {
        return '<button type="button" class="address-option" role="option" data-address-value="' + item.value.replace(/"/g, '&quot;') + '" data-address-index="' + index + '">' + item.label + '</button>';
      }).join('');
      results.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      setStatus('Choose the correct address from the dropdown.');
    }

    function fetchAddresses(query) {
      activeRequest += 1;
      var requestId = activeRequest;
      setStatus('Searching addresses…');
      fetch(endpoint + '?query=' + encodeURIComponent(query), {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Address lookup failed');
          return response.json();
        })
        .then(function (data) {
          if (requestId !== activeRequest) return;
          showResults(normaliseAddressResults(data));
        })
        .catch(function () {
          if (requestId !== activeRequest) return;
          hideResults();
          setStatus('Keep typing, or enter the full address manually if it does not appear.');
        });
    }

    if (input) {
      input.addEventListener('input', function () {
        updateFlow();
        var query = input.value.trim();
        window.clearTimeout(debounceTimer);
        if (query.length < 1) {
          hideResults();
          setStatus('Start typing and choose the correct address if it appears. You can also type the full address manually.');
          return;
        }
        debounceTimer = window.setTimeout(function () { fetchAddresses(query); }, 180);
      });

      input.addEventListener('blur', function () {
        window.setTimeout(hideResults, 180);
      });
    }

    if (results) {
      results.addEventListener('click', function (event) {
        var option = event.target.closest('[data-address-value]');
        if (!option || !input) return;
        input.value = option.getAttribute('data-address-value') || option.textContent;
        hideResults();
        setStatus('Address selected.');
        updateFlow();
      });
    }
  }

  // Progressive quote form: details → services → date → address → notes
  document.querySelectorAll('[data-progressive-quote-form]').forEach(function (form) {
    var serviceInput = form.querySelector('[data-service-needed]');
    var serviceSummary = form.querySelector('[data-service-summary]');
    var serviceOptions = Array.prototype.slice.call(form.querySelectorAll('[data-service-option]'));
    var dateSection = form.querySelector('[data-flow-section="date"]');
    var addressSection = form.querySelector('[data-flow-section="address"]');
    var notesSection = form.querySelector('[data-flow-section="notes"]');
    var dateField = form.querySelector('[data-date-field]');
    var addressField = form.querySelector('[data-address-field]');

    function selectedServices() {
      return serviceOptions.filter(function (option) { return option.checked; }).map(function (option) { return option.value; });
    }

    function setSection(section, show) {
      if (!section) return;
      section.classList.toggle('is-waiting', !show);
      section.classList.toggle('is-active', show);
    }

    function updateFlow() {
      var services = selectedServices();
      if (serviceInput) serviceInput.value = services.join(', ');
      if (serviceSummary) serviceSummary.textContent = services.length ? services.join(', ') : 'Select service(s) and add-ons';

      var hasServices = services.length > 0;
      var hasDate = dateField && dateField.value;
      var hasAddress = addressField && addressField.value.trim().length > 2;

      setSection(dateSection, hasServices);
      setSection(addressSection, hasServices && hasDate);
      setSection(notesSection, hasServices && hasDate && hasAddress);
    }

    setupDatePicker(form, updateFlow);
    setupAddressLookup(form, updateFlow);

    serviceOptions.forEach(function (option) { option.addEventListener('change', updateFlow); });
    if (addressField) addressField.addEventListener('input', updateFlow);

    form.addEventListener('submit', function (event) {
      if (!selectedServices().length) {
        event.preventDefault();
        var dropdown = form.querySelector('[data-service-dropdown]');
        if (dropdown) dropdown.open = true;
        if (dropdown) dropdown.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        return;
      }

      if (!dateField || !dateField.value) {
        event.preventDefault();
        form.classList.add('has-date-error');
        setSection(dateSection, true);
        var trigger = form.querySelector('[data-date-trigger]');
        var popover = form.querySelector('[data-calendar]');
        if (trigger) trigger.focus();
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
        if (popover) popover.hidden = false;
        return;
      }

      updateFlow();
    });

    updateFlow();
  });
});

```
