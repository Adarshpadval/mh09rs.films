# MH09RS FILMS — ASSET & CONTENT CONFIGURATION GUIDE
*Curated for Rohit Suryawanshi & MH09RS Films Team*

This guide explains how to replace temporary showcase assets with your own studio wedding photographs, cinematic reels, and YouTube film links without altering the design code.

---

## 1. Replacing Images (`assets/images/`)

All images are stored in `assets/images/` with clean filenames. To update an image, simply export your photo in high quality (JPG or WebP, 75-85% compression) and replace the corresponding file:

| Filename | Purpose | Recommended Resolution | Aspect Ratio |
| :--- | :--- | :--- | :--- |
| `hero-poster.jpg` | Homepage Hero background cover image | 1920 × 1080 px | 16:9 |
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

## 2. Updating YouTube Video Links & Film Modal

The featured film cards in `index.html` play videos inside a cinematic lightbox modal.

To update the video, locate the `data-video-id` attribute on each film card in `index.html`:

```html
<!-- Example: YouTube link is https://www.youtube.com/watch?v=AbCdEfGhIjK -->
<!-- The video ID is 'AbCdEfGhIjK' -->

<article class="film-card film-card-large" 
  data-video-id="YOUR_YOUTUBE_VIDEO_ID" 
  data-title="Your Film Title">
  ...
</article>
```

When a user clicks any film card, the site automatically opens an ad-free, responsive video player with your YouTube video.

---

## 3. Modifying Contact & WhatsApp Details

The WhatsApp number is configured across HTML links and the JS engine:
- WhatsApp number: `+91 95952 22860`
- To update the target recipient number, change `WA_PHONE_NUMBER = '919595222860'` in `assets/js/contact.js` and the `wa.me` links in `index.html` and `pages/*.html`.

---

## 4. Pre-Launch Checklist for Rohit

- [ ] Confirm high-resolution poster images for `hero-poster.jpg`.
- [ ] Add your preferred YouTube video IDs to `index.html`.
- [ ] Add genuine client testimonials into the testimonial section in `index.html`.
- [ ] Test the WhatsApp form with a sample inquiry on both desktop and mobile.
