# Agent Guidelines — Read This Before Touching Any Code

You are working on the Veritas Prime Properties Next.js template. A senior
engineer will review every change you make against the checklist in
`REVIEW_CHECKLIST.md`. These rules exist because past agent work on projects
like this fails in predictable ways — inventing colors, duplicating
components, silently guessing at ambiguous content. Follow them exactly,
even when a shortcut looks faster.

## Before you write any code

1. Read `README.md` in full (architecture, folder rules).
2. Read `docs/design-system.md` in full (every token, every component
   listed in the "Component inventory" section).
3. Read the specific ticket in `TICKETS.md` you were assigned. Do not start
   on a different ticket, and do not expand scope beyond what it states.
4. Open the original prototype HTML file the ticket references and read it
   top to bottom before writing a single line. The ticket summarizes it;
   the HTML file is the actual source of truth for exact copy and field
   names.

## Hard rules — violating any of these fails review automatically

- **Never write a raw color value.** No `#hexcode`, no `rgb()`, no
  `rgba()`, anywhere in a `.tsx` file. If you need a color, it already
  exists in `src/config/theme.tokens.js` as a Tailwind class (e.g.
  `bg-primary`, `text-verified`, `border-badge-cofo-border`). If you
  believe a genuinely new color is needed, stop and write a `## Needs new
  token` section in your PR description explaining why — do not add it to
  `theme.tokens.js` yourself.
- **Never hardcode brand name, contact info, or nav items.** Import from
  `@/config/site.config`. If the ticket needs new site-level content (e.g.
  a new footer link category), add it to `site.config.ts` in the same PR
  and say so explicitly in the PR description.
- **Never create a new button, card, badge, or input style from scratch.**
  Use `@/components/ui` primitives. If an existing primitive's variants
  genuinely can't produce what the design needs, do not hack it with an
  inline `className` override that fights the primitive — stop and flag it
  in your PR description as "Needs new variant on `<ComponentName>`" with a
  one-line description of the visual difference needed.
- **Never fetch data directly inside a page or component.** All data
  access goes through a `features/<domain>/api.ts` file behind a typed
  function (e.g. `getProperties(): Promise<Property[]>`). For this phase,
  that function can return mock/hardcoded data — the point is the
  component doesn't know or care where the data comes from.
- **Never use `any`.** Every new data shape gets a real TypeScript
  interface in `src/types/` (if shared across features) or the feature's
  own `types.ts` (if local to one feature).
- **Never guess at ambiguous or contradictory source content.** If the
  HTML has two different labels for what looks like the same field, or a
  number that doesn't make sense, or a business rule you can't verify
  (e.g. discount math, pricing logic) — leave `// TODO(agent): <your
  question>` in the code and list it under "Open questions" in your PR
  description. Do not invent an answer.
- **Touch only the files your ticket lists under "Files you will create /
  modify."** If you find yourself editing `tailwind.config.js`,
  `theme.tokens.js`, or `site.config.ts` and the ticket didn't say to,
  stop — that almost always means you should have used something that
  already exists instead.

## Before you declare the ticket done

Run, in order, and paste the output of both into your PR description:

```bash
npm run typecheck
npm run build
```

Both must pass with zero errors. A ticket with a failing build is not
done, regardless of how complete the UI looks.

## What "done" looks like

- Every field, label, and section listed in the ticket's "Explicit
  requirements" is present and matches the source HTML's actual copy
  (not a paraphrase of it).
- Every new component lives in the folder the ticket specifies, and reuses
  `components/ui/` primitives rather than reimplementing them.
- The PR description lists: what you built, any "Needs new token/variant"
  flags, and any "Open questions" TODOs — even if both lists are empty,
  say so explicitly rather than omitting the sections.
