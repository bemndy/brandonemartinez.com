# brandonemartinez.com

[![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-9135FF?style=for-the-badge&logo=Vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Vercel](https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Upstash](https://img.shields.io/badge/upstash-00E9A3?style=for-the-badge&logo=upstash&logoColor=black)](https://upstash.com/)

# About

Personal portfolio site. Live at [brandonemartinez.com](https://brandonemartinez.com).

# Stack

- React 19, React Router
- Vite — dev server and build tooling
- GSAP + ScrollTrigger — scroll animations
- Lenis — smooth scroll
- Motion — micro-interactions
- CSS custom properties — theming (dark/light mode)
- Vercel — hosting and serverless API routes
- Upstash Redis — persistent like count and song of the day data

# Structure

```
src/
├── components/     # Navbar, Footer, Header, NowPlaying, Overlay, etc.
├── pages/          # Hero, Music, About, Misc
├── App.jsx         # Routes and global layout
├── App.css         # Global styles and CSS variables
├── DarkModeContext.jsx
└── LenisContext.jsx
api/                # Vercel serverless functions (Spotify, likes, songs)
```

# Dev

```bash
npm install
npm run dev
```

Deployed automatically on push to `main` via Vercel.

# Bug Report or Feature Request

If you encounter a bug or have a feature request, [create an issue](https://github.com/bemndy/brandonemartinez.com/issues).
