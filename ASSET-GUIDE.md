# MH09RS FILMS — ASSET & CONTENT CONFIGURATION GUIDE
*Curated for Rohit Suryawanshi & MH09RS Films Team*

This guide explains how to replace temporary showcase assets with your own studio wedding photographs, cinematic reels, and YouTube film links without altering the design code.

---

## 1. Replacing Images (`assets/images/`)

All images are stored in `assets/images/` with clean filenames. To update an image, simply export your photo in high quality (JPG or WebP, 75-85% compression) and replace the corresponding file:

| Filename | Purpose | Recommended Resolution | Aspect Ratio |
| :--- | :--- | :--- | :--- |
| `hero-poster.jpg` | Homepage full-viewport hero photograph | 1600 × 2000 px | Responsive full-bleed crop; keep faces near the centre |
| `filmmaker-rohit.jpg` | Rohit Suryawanshi filmmaker portrait | 1000 × 1400 px | 3:4 or 4:5 |
| `film-story-01.jpg` | Featured Film 01 (The Wedding Film) | 1600 × 900 px | 16:9 |
| `film-story-02.jpg` | Featured Film 02 (Before Forever) | 1200 × 900 px | 4:3 or 16:9 |
| `film-story-03.jpg` | Featured Film 03 (The Celebration) | 1600 × 800 px | 2:1 or 16:9 |
| `gallery-wed-01.jpg` | Bridal radiance portrait | 1200 × 1600 px | 3:4 |
| `gallery-wed-02.jpg` | Sacred pheras & fire ritual | 1400 × 930 px | 3:2 |
| `gallery-wed-03.jpg` | Emotional bidaai tears/family hug | 1200 × 1600 px | 3:4 |
| `gallery-prewed-01.jpg` | Sunset silhouette romance | 1200 × 1600 px | 3:4 |
| `gallery-prewed-02.jpg` | Couple laughing in lush valley | 1400 × 930 px | 3:2 |
| `gallery-portrait-01.jpg` | Groom royal portrait | 1200 × 1600 px | 3:4 |
| `gallery-celeb-01.jpg` | Haldi yellow marigold petal shower | 1200 × 1600 px | 3:4 |
| `gallery-celeb-02.jpg` | Sangeet dance celebration | 1400 × 930 px | 3:2 |
| `travel-amba-ghat.jpg` | Amba Ghat landscape | 1600 × 1060 px | 3:2 |
| `travel-radhanagari.jpg` | Radhanagari wildlife/canopy | 1600 × 1060 px | 3:2 |
| `travel-barki.jpg` | Barki waterfalls monsoon cascade | 1600 × 1060 px | 3:2 |
| `travel-drone.jpg` | Western Ghats aerial perspective | 1600 × 1060 px | 3:2 |
| `service-weddings.jpg` | Wedding service card cover | 1200 × 800 px | 3:2 |
| `service-prewed.jpg` | Pre-wedding service card cover | 1200 × 800 px | 3:2 |
| `service-travel.jpg` | Travel & commercial card cover | 1200 × 800 px | 3:2 |

> **Pro Tip:** Keep individual images under 500 KB to maintain rapid load times on mobile devices. Use tools like [TinyJPG](https://tinyjpg.com/) or [Squoosh](https://squoosh.app/).

---

## 2. Updating YouTube Film Links

The featured film entries in `index.html` are ordinary links to the studio’s YouTube channel. Previous placeholder embed IDs have been removed.

Replace the `href` on each `a.film-card` with the real film URL, for example `https://www.youtube.com/watch?v=YOUR_VIDEO_ID`. Update the title, location, thumbnail, and accessible label together. Links open in a new tab. Travel imagery is a static showcase with a separate channel link.

## 3. Modifying Contact & WhatsApp Details

The WhatsApp number is configured across HTML links and the JS engine:
- WhatsApp number: `+91 95952 22860`
- To update the target recipient number, change the `https://wa.me/919595222860?text=` URL in `assets/js/contact.js` and the `wa.me` links in `index.html` and `pages/*.html`.

---

## 4. Pre-Launch Checklist for Rohit

- [ ] Confirm high-resolution poster images for `hero-poster.jpg`.
- [ ] Replace channel links with each featured film’s actual YouTube watch URL.
- [ ] Replace all temporary showcase photos, including the founder portrait, with approved studio assets and accurate captions.
- [ ] Confirm the package inclusions, delivery times, and location descriptions.
- [ ] Test the WhatsApp form with a sample inquiry on both desktop and mobile.
