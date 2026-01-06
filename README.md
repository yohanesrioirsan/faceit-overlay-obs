<div align="center">
  <img width="500" height="500" alt="faceit overlay" src="https://github.com/user-attachments/assets/bb67e0f0-62b7-4b08-acb6-a4c9093b5686" />
  
  # FACEIT CS2 Stats Overlay
  
  **Free. Auto-updating. Easy To Use.**
  
  Drop your K/D, ELO, and match history right into OBS. Updates in real-time while you stream.
</div>

## Setup

```bash
git clone https://github.com/yohanesrioirsan/faceit-overlay-obs.git
cd faceit-overlay-obs
npm install
```

Create `.env.local`:
```env
FACEIT_API_KEY=your_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Run it:
```bash
npm run dev
```

## How to Use

1. Hit `/generate`
2. Type your FACEIT nickname
3. Pick a template
4. Copy the URL
5. Paste into OBS as Browser Source

Done.

## Contributing

PRs welcome. Open an issue if something breaks.

## License

Open source. Use it however you want.

---

<div align="center">
  <sub>Stars appreciated ⭐ • Built for the community</sub>
</div>
