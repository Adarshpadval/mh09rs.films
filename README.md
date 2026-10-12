# MH09RS Films — Cinematic Wedding Photography & Cinematography

A world-class, premium wedding cinematography and photography portfolio website for **MH09RS Films**, founded and directed by **Rohit Suryawanshi** in Kolhapur, Maharashtra, India.

---

## 🌟 Brand & Visual Direction

- **Brand:** MH09RS Films
- **Founder & Cinematographer:** Rohit Suryawanshi
- **Base:** Kolhapur, Maharashtra, India (serving Kolhapur, Sangli, Pune, Western Ghats, and worldwide)
- **Primary Specializations:** Luxury Wedding Cinematography, Candid Wedding Photography, Pre-Wedding Films, Drone Perspectives, and Western Ghats Nature Documentaries.
- **Palette:** `#0A0A0A` (Deep Cinematic Black), `#111111` (Secondary), `#FFFFFF` (White), `#B8B8B8` (Muted), `#D97706` (Warm Amber Gold Accent).
- **Typography:** *Cormorant Garamond* (Editorial Serif) paired with *Plus Jakarta Sans* and *Cinzel*.

---

## 🛠️ Technology Stack

- **HTML5:** Semantic, accessible, and structured for optimal SEO and crawlability.
- **Modern CSS3:** Vanilla CSS variables, responsive typography using `clamp()`, glassmorphism, flexbox, CSS grid, and GPU-accelerated transforms.
- **Vanilla JavaScript (ES6+):** Lightweight motion system, custom cursor, IntersectionObserver scroll reveals, filterable masonry gallery, fullscreen lightbox, modal video viewer, and interactive WhatsApp booking engine.
- **100% Static & Serverless:** Zero build tools, zero dependencies, zero databases. Instant load times and effortless static hosting.

---

## 📁 Repository Structure

```text
MH09_RS_Films/
├── index.html                   # Cinematic homepage (all 12 master sections)
├── pages/
│   ├── portfolio.html           # Full photographic gallery & archives
│   ├── about.html               # The story of Rohit Suryawanshi & studio philosophy
│   ├── services.html            # Deliverables, packages, & investment details
│   └── contact.html             # Dedicated WhatsApp inquiry & booking hub
├── assets/
│   ├── css/
│   │   ├── style.css            # Core luxury design system tokens & layouts
│   │   ├── animations.css       # Preloader, cursor, parallax & keyframes
│   │   └── responsive.css       # Mobile-first breakpoints (360px to 1920px)
│   ├── js/
│   │   ├── main.js              # Preloader, sticky header, modal player, year
│   │   ├── animations.js        # Custom cursor follower & scroll observer
│   │   ├── portfolio.js         # Category filters & photo lightbox
│   │   └── contact.js           # Instant pre-filled WhatsApp booking generator
│   └── images/                  # High-resolution optimized wedding & travel assets
├── .nojekyll                    # Ensures correct static routing on GitHub Pages
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # XML sitemap for Google Search Console
├── ASSET-GUIDE.md               # Guide for updating images & YouTube links
└── README.md                    # Project documentation & deployment guides
```

---

## 🚀 Deployment Guide

### Phase 1: Deploy to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete cinematic portfolio website for MH09RS Films"
   git branch -M main
   git push -u origin main
   ```
2. Navigate to your repository settings on GitHub:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select **Branch: main** and folder **/ (root)**.
   - Click **Save**.
3. Your website will be live in minutes at:  
   `https://adarshpadval.github.io/mh09rs.films/`

### Phase 2: Deploy to Hostinger Shared Hosting

1. Log into your Hostinger hPanel.
2. Open **File Manager** for your domain (e.g. `mh09rsfilms.com`).
3. Open the `public_html/` root directory.
4. Upload all files from this project into `public_html/` (`index.html`, `pages/`, `assets/`, `robots.txt`, `sitemap.xml`).
5. Ensure HTTPS (SSL) is turned on in hPanel.
6. Your website is instantly live with zero configuration needed.

---

## 📱 WhatsApp Booking Flow

The website features an automated WhatsApp booking engine:
1. Visitors complete the inquiry form with event date, venue, guest count, and service preferences.
2. Client-side JavaScript validates inputs and composes a formatted, URL-encoded inquiry message.
3. Clicking **CHAT ON WHATSAPP** launches `https://wa.me/919595222860` with the pre-filled message ready to send.
4. No database or external CRM required — all conversations happen directly inside WhatsApp.

---

## 📸 Asset Customization

See [`ASSET-GUIDE.md`](./ASSET-GUIDE.md) for full instructions on replacing photos, updating YouTube video IDs, and tailoring package offerings.

---

## 📄 License & Attribution

Designed & Developed for **MH09RS Films** by Adarsh. Directed by Rohit Suryawanshi. All photographs and media assets reserved by their respective copyright holders.
