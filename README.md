# brandonemartinez.com

Personal portfolio site. Live at [brandonemartinez.com](https://brandonemartinez.com).

## Stack

- React 19, React Router
- GSAP + ScrollTrigger — scroll animations
- Lenis — smooth scroll
- Motion — micro-interactions
- CSS custom properties — theming (dark/light mode)
- Vercel — hosting and serverless API routes
- Upstash Redis — persistent like count and song of the day data

## Structure

```
src/
├── components/     # Navbar, Footer, Header, NowPlaying, Overlay, etc.
├── pages/          # Hero, Music, About, Misc
├── App.js          # Routes and global layout
├── App.css         # Global styles and CSS variables
├── DarkModeContext.js
└── LenisContext.js
```

## Dev

```bash
npm install
npm start
```

Deployed automatically on push to `main` via Vercel.
