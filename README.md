# AGORA — AI Historical Debate Simulator

> *"Argue with history. Learn to think."*

**Agora** is an interactive educational web application where students debate or interview AI simulations of history's greatest thinkers and receive structured, objective evaluations on the quality of their reasoning from an independent AI Judge.

---

## 🏛️ Key Features

- **5 Historical Thinkers**:
  - **Socrates** *(469–399 BCE)*: Socratic questioning on democracy and virtue.
  - **Albert Einstein** *(1879–1955)*: Gedankens and physical determinism vs atomic ethics.
  - **Marie Curie** *(1867–1934)*: Empirical rigor, open science patents, and fundamental research.
  - **Abraham Lincoln** *(1809–1865)*: Constitutional logic, liberty vs security, and pragmatism.
  - **Leonardo da Vinci** *(1452–1519)*: Multidisciplinary synthesis, art vs science, and natural mechanics.
- **Two Educational Modes**:
  - **Mode A (Debate)**: Take a stance. The historical figure actively challenges your logic over 4–6 rounds.
  - **Mode B (Interview)**: Ask probing questions to explore historical worldviews.
- **Decoupled AI Engine**:
  - **Agent 1 (Historical Figure)**: Stays strictly in character, uses era-appropriate knowledge, and challenges student assumptions.
  - **Agent 2 (Reasoning Judge)**: Independent evaluator that grades argument quality objectively using a 7-metric rubric.
- **7-Metric Reasoning Rubric** (scored 0–100 via strict Zod schema):
  1. *Argument Clarity*
  2. *Evidence & Proof*
  3. *Logical Consistency*
  4. *Counterargument Handling*
  5. *Rebuttal Execution*
  6. *Historical Context*
  7. *Perspective Taking*
- **Progress Tracking & Retry Mechanism**: Track score improvements across attempts (e.g. `+14 improvement`).
- **Perspective Shift ("Switch Sides")**: Re-enter debates defending the opposing position as a critical thinking exercise.
- **Deterministic Offline Demo Mode**: Instant pre-configured Socrates debate presentation mode requiring no API key.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **AI Infrastructure**: `@google/genai` (Google Gemini API abstraction) with fallback provider logic
- **Data Validation**: `zod` schema validation for structured Reasoning Judge JSON
- **Icons & Animations**: `lucide-react`, `framer-motion`, `canvas-confetti`

```text
agora/
├── app/
│   ├── api/
│   │   ├── debate/route.ts      # Real-time historical figure persona route
│   │   └── evaluate/route.ts    # Independent reasoning judge evaluation route
│   ├── figures/page.tsx         # Detailed historical thinker gallery
│   ├── debate/page.tsx          # Direct arena launcher
│   ├── globals.css              # Dark academic theme design tokens
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page & core educational loop
├── components/
│   ├── navbar.tsx               # Top navigation & Demo Mode trigger
│   ├── hero.tsx                 # Landing hero section
│   ├── figure-card.tsx          # Historical figure card
│   ├── figure-selection-modal.tsx # Topic & stance configuration
│   ├── debate-arena.tsx         # Interactive debate chat arena
│   ├── judge-dashboard.tsx      # Comprehensive score cards & rubric feedback
│   └── switch-sides-modal.tsx   # Perspective shift modal
├── config/
│   └── figures.ts               # Structured configuration for all 5 thinkers
├── lib/
│   ├── ai/
│   │   ├── provider.ts          # Provider abstraction (Gemini / Fallback)
│   │   ├── debate-agent.ts      # Persona agent prompt engineering
│   │   └── judge-agent.ts       # Reasoning judge prompt with Zod schema
│   ├── demo-data.ts             # Pre-configured Socrates demo transcript & report
│   ├── storage.ts              # LocalStorage attempt history tracker
│   └── types.ts                 # TypeScript interfaces
├── .env.example                 # Environment variables template
├── LICENSE                      # MIT License
└── package.json
```

---

## 🚀 Local Development Setup

1. **Clone Repository**:
   ```bash
   git clone https://github.com/whiterose456/September-ai-challang.git
   cd September-ai-challang
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and add your Google Gemini API Key:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
   *(Note: The app will run in high-quality fallback/demo mode if no key is provided).*

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Verify Build**:
   ```bash
   npm run build
   ```

---

## ☁️ Deployment Instructions (Vercel)

This Next.js application is fully optimized for standard Vercel deployment:

1. Push code to GitHub repository.
2. Import project into Vercel Dashboard.
3. Add Environment Variable:
   - Name: `GEMINI_API_KEY`
   - Value: `<Your Google Gemini API Key>`
4. Deploy!

---

## 📜 License

Distributed under the [MIT License](file:///c:/Users/ACER/September-ai-challang/LICENSE).
