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

### Get Your FACEIT API Key
1. Go to [FACEIT Developer Portal](https://developers.faceit.com/)
2. Sign in with your FACEIT account
3. Create a new app or use an existing one
4. **Choose "Server-side API Key"** when prompted
5. Copy your API key from the app settings

Create `.env.local`:
```env
FACEIT_API_KEY=your_api_key_from_developer_portal
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Contributing

PRs welcome. Open an issue if something breaks.

## License

Open source. Use it however you want.

---

<div align="center">
  <sub>Stars appreciated ⭐ • Built for the community</sub>
</div>
