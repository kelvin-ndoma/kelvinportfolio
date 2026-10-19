# Kelvin Ndoma · Portfolio

Personal portfolio for Kelvin Ndoma Mutua, AI Solutions Engineer & Full-Stack Developer.

Next.js 16 App Router (Cache Components, Partial Prefetching), strict TypeScript, Tailwind CSS 4,
Radix UI, Motion, Lucide and MDX. No database, authentication or CMS: content lives in typed files.

## Run it

```bash
npm install
# fill in .env (EmailJS + contact details), then:
npm run dev
```

## Checks

```bash
npm run check    # typecheck, lint, unit tests, production build
npm run start    # then, in another terminal:
npm run audit    # crawls every link, axe WCAG A/AA, mobile nav, filter and contact form
```

`npm run audit` and `scripts/screenshot.mjs` use Playwright's Chromium. On Linux it may need
shared libraries; set `LD_LIBRARY_PATH` to a folder that provides them. `BASE_URL` selects the server.

## Content

| What | Where |
| --- | --- |
| Site name, title, contact links | `content/site.ts` (+ `NEXT_PUBLIC_*` variables) |
| Project registry (all projects, filter groups, system models) | `content/projects.ts` |
| Long-form case studies | `content/work/*.mdx`, registered in `content/case-studies.ts` |
| Expertise, Microsoft 365 proficiency, engineering stack | `content/expertise.ts` |
| About narrative, education and experience path | `content/profile.ts` |
| Approach steps | `content/process.ts` |

Rules the content follows, enforced in part by `tests/content.test.ts`:

- Only verified facts. No invented metrics, clients, outcomes or screenshots.
- Optional facts render only when present: add `period` and `organization` to entries in
  `content/profile.ts`, or `screenshots` to a project, and they appear without code changes.
- Project covers are typography-led "system models" drawn from each project's real domain,
  labelled as models so they are never mistaken for screenshots.

### Adding assets

- **Resume PDF:** place the approved CV at `public/resume/kelvin-ndoma-mutua-cv.pdf`. The download
  button on `/resume` appears automatically on the next build.
- **Screenshots:** add images under `public/work/<slug>/` and list them in the project's `screenshots`
  field. The case-study gallery is hidden until at least one exists.
- **Portrait:** none is used until one is supplied.

## Contact form

Server action in `app/contact/actions.ts`: Zod validation, honeypot field, minimum fill time,
per-IP rate limit (in memory, per instance) and delivery through [EmailJS](https://www.emailjs.com).

EmailJS template variables (match the dashboard template):

- `{{from_name}}` — visitor name (also used in the subject)
- `{{to_name}}` — salutation (defaults to `Kelvin` via `EMAILJS_TO_NAME`)
- `{{message}}` — body including email, topic, organization, and their message

Set `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID` and `EMAILJS_PUBLIC_KEY` (plus optional
`EMAILJS_PRIVATE_KEY` for server-only sends) in `.env`. Without those keys, development
logs submissions and production shows an email fallback. Secrets stay on the server.

Tip: change the template sign-off from “Aluminium Fabricators Company” to your own name in the
EmailJS Content editor.

Required for this server-side form: EmailJS → Account → Security → enable
**Allow API requests from non-browser applications**. Without that, sends return HTTP 403.
