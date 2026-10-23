# Alfin Noviaji Portfolio

Portfolio website built with Next.js 16 and exported as a static site for GitHub Pages. Use Node.js 22 or newer for the Valfuse compiler and build.
The original portfolio layout is styled with Tailwind CSS v4. The color palettes and Sora font from the Vite project are defined in `src/app/globals.css` with `@theme`.

## Local development

```sh
npm ci
npm run dev
```

## Checks and build

```sh
npm run lint
npm run typecheck
npm run build
```

`npm run build` creates the deployable static site in `out/`. Run `npm run deploy` to check, build, and publish `out/` to the `gh-pages` branch. Pushing to `master` runs this deploy automatically through GitHub Actions; pull requests to `master` run validation and build only. Set the Pages source to the `gh-pages` branch and root folder in **Repository Settings → Pages**. This project uses Next.js static export, so production hosting serves the exported files directly; `next start` is not used. The site is configured for the root domain `alpinnz.github.io`; set `basePath` in `next.config.ts` if deploying under a repository subpath instead.

## Content and assets

- English and Indonesian content: `src/data/en` and `src/data/id`
- `npm run localization:generate` converts that content into the Valfuse source format, validates locale parity, and creates the React runtime manifest. The development, lint, typecheck, and build commands regenerate it automatically.
- `npm run localization:validate` checks the generated source without emitting runtime files.
- React uses `@valfuse-node/react` for localization state and the contact form. `@valfuse-node/validation` owns its schema and rules. The project does not need the Express or Vue adapters.
- Images, icons, project galleries, and CV: `public/assets`, `public/portfolio`, and `public`

## Contact form delivery

The site is exported as static files for GitHub Pages, so it cannot run a Next.js POST Route Handler. The contact form sends a browser POST to Formspree and keeps email delivery outside the client. Create a Formspree form, verify `alpinnz@gmail.com`, and set it as the form's target email. Formspree's endpoint is available in the dashboard's Integration section.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORMSPREE_FORM_ID` to your Formspree form ID for local builds. GitHub Actions reads that name from **Repository Settings → Secrets and variables → Actions**, accepting either a repository secret or variable. Because `NEXT_PUBLIC_` values are included in the static site, this form ID is public configuration; storing it as a variable is sufficient. Without it, the contact form shows a setup message and does not submit. See the [Formspree HTML form guide](https://help.formspree.io/articles/building-your-form/building-an-html-form/) for endpoint setup.
