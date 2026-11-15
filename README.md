# TripWise

A React travel budget estimator and itinerary planner for overseas round trips from KLIA. Built with Vite, React Router and plain CSS. Estimates use RM and follow the completed TripWise Python application.

## Run locally

Use Node.js 22.12 or newer in the Node 22 line (`.nvmrc` selects Node 22).

```sh
npm install
npm run dev
```

Open the URL printed by Vite. Existing lockfile installs can use `npm ci`.

For this development session, a verified official Node runtime was downloaded to `/tmp/tripwise-runtime/node-v22.23.5-linux-x64`. If Node is not on your PATH, use it temporarily:

```sh
export PATH="/tmp/tripwise-runtime/node-v22.23.5-linux-x64/bin:$PATH"
npm run dev
```

The `/tmp` runtime may be removed by the operating system; install Node 22 for a lasting setup.

## Checks

```sh
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

To use an existing Chrome installation instead of downloading Chromium:

```sh
TRIPWISE_CHROME_PATH=/opt/google/chrome/chrome npm run test:e2e -- --workers=2
```

The browser suite starts and stops its own Vite server. It tests 1440px desktop and 390px mobile layouts and captures welcome and summary screenshots in the ignored `test-results/` directory. `npm run preview` serves the production build after `npm run build`.

## Application structure

- `src/app/`: routes, shared layouts and planner steps.
- `src/pages/`: welcome, six planner steps, pricing guide and not-found screen.
- `src/components/`: controls, destination selection, budget and itinerary views.
- `src/data/`: Python pricing, schematic map coordinates and researched places.
- `src/domain/`: UI-independent validation, pricing, expenses, scheduling and summaries.
- `src/state/`: reducer and React context for the trip draft.
- `src/lib/`: browser persistence and RM formatting.
- `src/styles/`: theme tokens, responsive layout and component styles.
- `tests/`: Python-generated reference fixtures, unit tests and browser flows.

Start at `/`. Planner routes are `/plan/destination`, `/plan/details`, `/plan/spending`, `/plan/estimate`, `/plan/itinerary` and `/plan/summary`. `/pricing` is available throughout. Later steps redirect to missing inputs when needed.

## Scope and reference

Drafts stay in this browser via localStorage when available. Rates are estimates, not live quotes. Destination research is intentionally empty; travellers can continue and add their own attractions. This version estimates planned spending and does not record actual transactions.

See [reference rules](docs/reference-rules.md) for formulas, source mappings, scheduling, research boundaries and fixture regeneration. The overview and planning PDF were absent from the checkout; implementation follows `AGENTS.md` and the completed Python code.

Production output is `dist/`. A future static host must serve `index.html` for application routes. This project has not been published.
