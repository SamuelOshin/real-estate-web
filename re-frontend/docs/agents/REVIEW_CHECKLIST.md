# Review Checklist — For the Human Reviewing an Agent's PR

Run through this on every PR before merging, in this order. Most items are
a single grep — do the mechanical checks first, they catch most agent
failure modes before you even need to read the diff closely.

## 1. Mechanical checks (run these commands)

```bash
# Nothing builds without passing both of these — if the agent's PR
# description doesn't already show clean output, run them yourself first.
npm run typecheck
npm run build

# No raw hex/rgb colors introduced outside the token file itself.
# Any hit here (other than in theme.tokens.js) is an automatic bounce-back.
grep -rn "#[0-9a-fA-F]\{3,8\}" src/ --include="*.tsx" | grep -v "theme.tokens"
grep -rn "rgba\?(" src/ --include="*.tsx"

# No `any` sneaking into new code.
grep -rn ": any" src/ --include="*.tsx" --include="*.ts"

# No direct fetch() calls inside components/pages (should only appear in
# features/*/api.ts files).
grep -rln "fetch(" src/ --include="*.tsx"
```

## 2. Scope check

- [ ] Only files listed in the ticket's "Files you will create / modify"
      were touched. `git diff --stat` against the ticket list — anything
      extra needs an explanation in the PR description.
- [ ] `tailwind.config.js`, `theme.tokens.js`, and `site.config.ts` were
      not modified unless the ticket explicitly called for it.

## 3. Content fidelity

- [ ] Spot-check at least 4 pieces of copy (headings, labels, button text)
      against the actual source HTML file — not the ticket's summary of
      it, the real file. Agents paraphrase; the source HTML is the
      contract.
- [ ] Every form field listed in the ticket's field table is present, with
      the right input type (text/select/tile-choice/date/etc.).
- [ ] Verification badges, prices, and plot sizes use the existing
      `VerificationBadge`, `formatNaira`, and `formatPlotSize` utilities —
      not ad hoc formatting.

## 4. Architecture fidelity

- [ ] New components live in the correct folder (`components/ui` only for
      generic primitives with no business logic; `features/<domain>/` for
      anything domain-specific).
- [ ] No component reimplements something `components/ui/` already
      provides (check the Badge/Button/Card/Input files before approving
      a new one-off styled element).
- [ ] Any "Needs new token" or "Needs new variant" flag in the PR
      description is resolved by you (the reviewer) adding it centrally —
      never by quietly approving an inline workaround.

## 5. Honesty check

- [ ] The PR description's "Open questions" section is present, even if
      empty. A PR with zero TODOs on a genuinely ambiguous source page
      (e.g. the multi-step publish form, or the discount campaign math in
      the admin dashboard) is a signal the agent guessed instead of
      flagging — reread the diff more carefully in that case, don't just
      trust the empty list.

## If a PR fails this checklist

Don't patch it yourself and merge. Send it back with the specific failed
checklist item(s) named — the point of this workflow is that the agent
fixes its own output against clear feedback, the same as a junior
engineer would.
