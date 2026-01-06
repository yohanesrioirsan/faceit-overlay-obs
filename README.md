# FaceitOBS

A free, auto-updating FACEIT CS2 stats overlay for OBS streaming. Display your K/D ratio, ELO, win rate, and recent match history in real-time on your stream.

## Features

- Auto-updating stats (refreshes every 60 seconds)
- Multiple template designs
- Real-time FACEIT data (ELO, K/D, Win Rate, Match History)
- OBS ready with transparent background
- 100% free

## Quick Start

### Installation

```bash
git clone https://github.com/yohanesrioirsan/faceit-overlay-obs.git
cd faceit-overlay-obs
npm install
```

### Setup

1. Create `.env.local`:
```env
FACEIT_API_KEY=your_faceit_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Usage

1. Go to `/generate`
2. Enter your FACEIT nickname
3. Select a template
4. Copy the overlay URL: `/overlay/[your-nickname]`
5. Add as Browser Source in OBS with the URL

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI
- FACEIT API

## Available Templates

- **Classic**: Clean, minimalist design
- **Type 1**: Modern design with avatar background

## Development

```bash
npm run dev    # Start dev server
npm run build  # Build for production
npm run start  # Start production server
```

## Contributing

Contributions welcome! Open an issue or submit a PR.

## License

Open source - feel free to use for personal or commercial projects.

---

Made by players, for players 🎮
