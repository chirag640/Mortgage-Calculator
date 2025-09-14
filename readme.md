# Mortgage Calculator

A clean, responsive mortgage calculator built with Next.js, React and Tailwind CSS. It calculates monthly mortgage payments, shows total interest and payment breakdown, and visualizes principal vs interest in a responsive chart.

## Key features

- Interactive loan input form (loan amount, down payment, interest rate, loan term)
- Accurate mortgage amortization formula with 0% interest handling
- Clear results card showing monthly payment, total interest, and total payment
- Pie chart breakdown (Principal vs Interest) using Recharts
- Accessible, responsive UI built with Tailwind CSS and a small design system
- Ready for local development with Next.js 14

## Tech stack

- Next.js 14 (app router)
- React 18
- TypeScript
- Tailwind CSS
- Recharts (charts)
- Lucide icons

## Getting started

### Prerequisites

- Node.js 18+ and npm (or pnpm) installed

### Install dependencies

```bash
# from repository root
npm install
# or with pnpm
pnpm install
```

### Run development server

```bash
npm run dev
# or with pnpm
pnpm dev
```

Open http://localhost:3000 in your browser.

## Available scripts

- `npm run dev` — start Next.js in development mode
- `npm run build` — build the production app
- `npm run start` — run the built app
- `npm run lint` — run Next.js lint

## Project structure (important files)

- `app/` — Next.js app router pages and layout
  - `app/page.tsx` — Home page; mounts the `MortgageCalculator` component
  - `app/layout.tsx` — Root layout, global fonts and analytics
- `components/` — UI components for the calculator
  - `mortgage-calculator.tsx` — Main client component with form, validation and calculation logic
  - `mortgage-results.tsx` — Results card and formatted values
  - `payment-breakdown-chart.tsx` — Recharts pie chart visualization
  - `theme-provider.tsx` — theme wrapper (next-themes)
- `components/ui/` — small design system primitives (Button, Input, Select, Card, etc.)
- `app/globals.css` & `styles/globals.css` — Tailwind and design tokens
- `package.json` — scripts and dependencies

## How the calculator works

1. User inputs loan amount, down payment, annual interest rate, and loan term.
2. The principal is calculated as `loanAmount - downPayment`.
3. If interest rate is 0, the monthly payment is `principal / (years * 12)`. Otherwise the standard mortgage formula is used:

monthlyPayment = (P * (r * (1 + r)^n)) / ((1 + r)^n - 1)

where P = principal, r = monthly rate, n = number of payments.

## Notes and assumptions

- Currency and formatting: USD is used by default via `Intl.NumberFormat("en-US", { currency: "USD" })`.
- Interest input is treated as an annual percentage (e.g., enter 3.5 for 3.5% APR).
- No backend required — all calculations run client-side.

## Accessibility & UX

- Form fields use labels and helper text for clarity.
- Buttons are disabled when inputs are invalid.
- Loading state simulates calculation delay for improved feedback.

## Customization & extensions

- Add amortization schedule export (CSV) or loan payoff timeline
- Add additional fees (taxes, insurance, PMI) to the calculation
- Internationalization: support other locales and currencies

## Contribution

1. Fork the repository
2. Create a branch: `git checkout -b feat/my-change`
3. Make changes and add tests if applicable
4. Open a pull request with a clear description

## License

This repository does not include an explicit LICENSE file. Add one (for example MIT) if you plan to open-source it.

## Contact

For questions or help running the project, open an issue in this repository.
