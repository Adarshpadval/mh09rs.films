# MH09RS Films

Static wedding film and photography portfolio for Rohit Suryawanshi, Kolhapur. No build step is required. Serve this directory with a static server; navigation and assets use relative paths and work both at the server root and under a deployment subdirectory.

## Design

A simple photographic hero appears immediately, without a lens intro, animation controls, parallax, or scroll interception. Warm ivory, charcoal, bronze details, editorial serif headings, and quiet layouts keep attention on the work. The horizontal About filmstrip has been removed.

Mobile layouts use a shorter hero, two-column photography galleries, landscape film thumbnails, compact service images, and a smaller founder portrait. Booking remains visible beside the mobile menu. Text and images are rearranged for small screens rather than scaling down the desktop layout.

## Source

- `index.html`: homepage and concise enquiry form.
- `pages/`: portfolio, studio, services, and detailed contact pages.
- `assets/css/style.css`: base tokens and shared components.
- `assets/css/responsive.css`: shared responsive layouts.
- `assets/css/cinematic.css`: editorial presentation and mobile refinements.
- `assets/css/animations.css`: static image frames and reduced-motion defaults.
- `assets/js/main.js`: mobile navigation, header appearance, current year.
- `assets/js/portfolio.js`: filters and accessible native photo dialog.
- `assets/js/contact.js`: form validation and WhatsApp handoff.

Animation libraries are no longer loaded. The retired animation script is not referenced by any page. Fonts use Google Fonts with local fallbacks.

## URLs and deployment

There are no hardcoded GitHub Pages origins in the HTML or assets. Image metadata also uses relative paths. Canonical and Open Graph page URLs are omitted until the final production domain is known. The sitemap tied to the development origin and its robots entry were removed. When a production domain is selected, generate a sitemap and absolute sharing metadata for that domain as part of deployment; do not point local development at the development GitHub host.

## Interactions and content

Gallery filters announce the visible count. The photo dialog supports arrow keys, Escape, and focus restoration. Mobile navigation closes on Escape or link selection. Enquiries open a prefilled WhatsApp message for the visitor to review and send; nothing is sent automatically.

Existing showcase photos, including the founder portrait, remain provisional. Replace them with approved studio images and matching captions before publication; see [ASSET-GUIDE.md](ASSET-GUIDE.md). Film cards retain the studio YouTube channel destination until individual film URLs are supplied. Testimonials remain omitted because approved reviews are unavailable.

## Verification

Run `node .cinematic-qa.cjs` with Playwright available at the path configured in that file and Microsoft Edge installed. The test starts and closes its own local server. Checks cover all five routes at 320, 390, 768, 1024, and 1440 pixels: overflow, heading count, mobile image height, local links and fragments, static hero, filters, lightbox, menu, mocked WhatsApp handoff, reduced motion, and the no-JavaScript hero. Screenshots are saved to the system temporary directory. External video playback and actual message delivery are not tested.
