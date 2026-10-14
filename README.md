# MH09RS Films

Static wedding film and photography portfolio for Rohit Suryawanshi, Kolhapur.

## Design

Warm paper (`#fbfaf7`), charcoal (`#111111`), and vermillion (`#b83224`). The layout uses a 12-column grid, an asymmetric 5–2–5 hero, staggered images, and continuous bordered service/package rows. Plus Jakarta Sans supplies the main typography; JetBrains Mono supplies functional labels. The original white PNG logo sits on a charcoal panel.

There are no card shadows, gradient overlays, preloaders, custom cursors, or scroll-reveal dependencies. Content remains visible without animation. The layout adapts from desktop to 320px screens.

## Pages and source

- `index.html`: homepage, selected films, six selected photographs, services, enquiry.
- `pages/portfolio.html`: full gallery with category filters and native dialog viewer.
- `pages/about.html`: studio introduction, approach, expandable FAQs.
- `pages/services.html`: service detail and package ledger.
- `pages/contact.html`: contact information and WhatsApp enquiry.
- `assets/css/style.css`: tokens and components.
- `assets/css/responsive.css`: responsive grid changes.
- `assets/css/animations.css`: reduced-motion preference.
- `assets/js/main.js`: accessible mobile navigation and current year.
- `assets/js/portfolio.js`: immediate filtering and keyboard-accessible photo viewer.
- `assets/js/contact.js`: form validation and WhatsApp handoff.

No build step or production dependencies. Serve this folder with a static HTTP server or deploy its contents to the existing static host. Keep the relative directory structure intact. Fonts load from Google Fonts and have local fallback families.

## Interactions

The enquiry form validates the required details and phone length, prepares a message, and opens WhatsApp for the visitor to review and send. A fallback link remains visible if a popup is blocked. No enquiry is sent automatically.

Gallery filters update immediately and announce the visible count. Photo dialogs support Previous/Next, arrow keys, Escape, and focus restoration. The mobile navigation closes on Escape or link selection and prevents interaction with the obscured page.

Featured films currently link to the studio YouTube channel because the previous embed IDs were placeholders. Replace each film link with its actual watch URL when available.

## Content before publication

Existing showcase photographs remain provisional, including the filmmaker portrait. See [ASSET-GUIDE.md](ASSET-GUIDE.md). Replace them with the studio’s own work, adjust captions and alternative text to match, and confirm package details and delivery timelines. The previous unverified testimonial and popularity badge have been removed.

## Verification

Checked in headless Microsoft Edge at 1440px, 768px, 390px, and 320px. Checks cover page overflow, image loading, heading structure, internal links, menu behaviour, gallery filtering, photo dialog controls, FAQ expansion, and a mocked WhatsApp handoff. No message was sent.
