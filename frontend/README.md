# KaziNzuri

Jukwaa la kazi za kawaida nchini Tanzania — limejengwa kwa **React + Vite** na **react-router-dom**.

## Pages zinazojitegemea

| Njia (route) | Page | Maelezo |
|---|---|---|
| `/` | Nyumbani (`HomePage`) | Orodha ya kazi, hero slider, kutangaza & kuomba kazi |
| `/login` | Ingia (`LoginPage`) | Fomu ya kuingia. Button ya **Ingia** kwenye navbar inakuleta hapa |
| `/register` | Jisajili (`RegisterPage`) | Fomu ya kujisajili. Inafikika kupitia kiungo "Jisajili hapa" ndani ya login |

## Mtiririko wa matumizi

1. Mtumiaji yuko nyumbani (`/`).
2. Akibonyeza **Ingia** kwenye navbar → anapelekwa `/login`.
3. Kama hana akaunti, anabonyeza **"Jisajili hapa"** → anaenda `/register`.
4. Baada ya kujisajili → anarudishwa `/login`; baada ya kuingia → anarudi nyumbani `/`.

> Kumbuka: Login na Register kwa sasa ni za mfano (hazifungamani na seva). Sehemu zenye `// Hapa ungeweka mawasiliano na seva (API)` ndizo za kuunganisha API yako halisi (backend).

## Kuendesha (run)

```bash
npm install      # weka utegemezi
npm run dev      # endesha kwa maendeleo (development)
npm run build    # jenga toleo la production
npm run preview  # angalia toleo la production
```

## Muundo wa folda

```
src/
├── components/      # vipengele vinavyotumika tena (Navbar, Logo, JobCard, modals, Footer...)
├── pages/           # HomePage, LoginPage, RegisterPage
├── data/            # data za kazi (kazi.js)
├── styles/          # globals.css (tokens) + app.css (vipengele)
├── App.jsx          # routing
└── main.jsx         # kiingilio + BrowserRouter
```
