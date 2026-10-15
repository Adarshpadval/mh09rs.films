# MH09RS Films

Static wedding film and photography portfolio for Rohit Suryawanshi, Kolhapur. The existing GitHub Pages deployment and relative asset paths are retained; no build step is needed.

## Design and behavior

Warm ivory (#F7F5F0), charcoal (#111210), near-black (#171715), and restrained bronze. Cormorant Garamond headings pair with Plus Jakarta Sans navigation and body text. The homepage flows from a full-viewport hero through studio introduction, films, photography, studio philosophy, services, process, and enquiry.

The original SVG lens opens its individual blades in a 2.2-second sequence. Skip intro immediately reveals the photograph. Pause/resume controls the sequence and subsequent subtle desktop parallax. Scrolling past the opening ends the intro without pinning or delaying navigation. Reduced-motion users and visitors without JavaScript see the photograph directly. Navigation, heading, and portfolio link remain accessible throughout.

Gallery filters and the native dialog retain keyboard navigation, Escape, and focus restoration. The mobile header keeps booking visible alongside the menu. The enquiry form prepares a WhatsApp message for the visitor to review and send; it never sends automatically. Homepage fields are name, phone, optional email, date, event type, and venue.

## Source

- `index.html`: homepage and concise enquiry form.
- `pages/`: existing portfolio, studio, services, and detailed contact pages.
- `assets/css/style.css`: base tokens and shared components.
- `assets/css/responsive.css`: shared responsive layouts.
- `assets/css/cinematic.css`: editorial presentation and hero.
- `assets/css/animations.css`: existing image-frame and About filmstrip styling.
- `assets/js/animations.js`: aperture, motion preference, header, and bounded hero parallax.
- `assets/js/main.js`, `portfolio.js`, `contact.js`: navigation, gallery, and enquiry.

The existing vendored GSAP powers the short intro. ScrollTrigger is no longer loaded. No dependencies were added. Canonical URLs, absolute sharing images, sitemap, and robots configuration support the existing GitHub Pages subpath.

## Content awaiting studio assets

The repository's showcase photos, including the founder portrait, remain provisional. Replace them with approved studio images and matching captions before publication; see [ASSET-GUIDE.md](ASSET-GUIDE.md). Film cards retain their configured YouTube channel destination until individual film URLs are supplied. Testimonials are intentionally omitted because approved reviews are unavailable.

## Verification

Run `node .cinematic-qa.cjs` with Playwright available at the path configured in that file and Microsoft Edge installed. The test serves the repository temporarily under `/mh09rs.films/` and closes its server on completion.

Checks cover all five routes at 320, 390, 768, 1024, and 1440 pixels; overflow, heading count, images, local links and fragments, aperture clipping and pause/resume/skip, gallery filters and lightbox, mobile menu, a mocked WhatsApp handoff, reduced motion, and the no-JavaScript hero. Screenshots are written to the system temporary directory. External film playback and actual message delivery are not tested.
