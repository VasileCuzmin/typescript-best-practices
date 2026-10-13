# Clean Angular Todo

An Angular todo-list application organized around domain entities, use cases,
data access, and presentation components. The numbered directories contain the
course slides for the TypeScript best-practices topics covered by the project.

## Requirements

- Node.js 20 or later
- npm

## Getting started

Install the dependencies and Git hooks:

```bash
npm install
```

The `prepare` script runs Husky during installation, which configures the local
Git hooks. Start the application with:

```bash
npm start
```

Open `http://localhost:4200/` in a browser.

## Project structure

```text
.
|- 02/ ... 07/                 Course slides by topic
|- src/
|  |- data/                    Infrastructure implementations, such as local storage
|  |- domain/
|  |  |- entities/             Todo and todo-list business entities
|  |  |- repositories/         Repository contracts
|  |  |- use-cases/            Application actions and their tests
|  |  `- utilities/            Shared domain helpers, guards, and logging
|  `- presentation/            Angular bootstrap, styles, and UI components
|     `- app/                  Root, list, todo, popup, and error components
|- angular.json                Angular build, serve, and lint targets
|- eslint.config.js            ESLint flat configuration for TypeScript and templates
|- .prettierrc.json            Shared formatting rules
`- .husky/pre-commit           Checks run before each commit
```

## Development commands

| Command            | Purpose                                     |
| ------------------ | ------------------------------------------- |
| `npm start`        | Serve the application locally.              |
| `npm run build`    | Create a production build in `dist/`.       |
| `npm test`         | Run the Jest test suite.                    |
| `npm run lint`     | Lint TypeScript and Angular HTML templates. |
| `npm run prettier` | Format repository files with Prettier.      |

## Code quality tooling

### Initialize from the CLI

For a new Angular project, initialize the same tooling in this order:

```bash
# Adds Angular-aware ESLint support and configures the Angular lint target.
ng add angular-eslint

# Installs the formatter and the packages that integrate it with ESLint.
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

# Adds a script for formatting the repository.
npm pkg set scripts.prettier="prettier --write ."

# Creates .husky/pre-commit and adds the prepare script to package.json.
npx husky init
```

Prettier has no dedicated initialization command. Create a `.prettierrc.json`
file with the desired formatting rules, then format the existing source once:

```bash
npx prettier --write .
```

`npx husky init` creates a pre-commit hook with a default command. Replace or
extend its contents with the checks required by the project. This repository's
`.husky/pre-commit` runs `npm test`, `npm run lint`, and `npm run prettier`.

### ESLint

ESLint statically analyzes code for likely errors and enforces project rules.
This project uses ESLint's flat configuration in `eslint.config.js`, with
TypeScript ESLint and Angular rules for `.ts` files and Angular template and
accessibility rules for `.html` files. It also reports Prettier differences as
lint errors, so formatting drift is visible in lint output.

Run it manually with:

```bash
npm run lint
```

### Prettier

Prettier is an opinionated formatter: it changes code layout, spacing, quotes,
and other presentation details without deciding whether the code is correct.
Its rules live in `.prettierrc.json`; `npm run prettier` applies those rules to
the repository.

Run it manually with:

```bash
npm run prettier
```

### Husky

Husky manages Git hooks. It does not lint or format code itself; it runs the
project commands automatically at Git workflow points. After `npm install`, the
`prepare` script enables Husky. The `.husky/pre-commit` hook runs the test
suite, ESLint, and Prettier before each commit. A commit is stopped when a test
or lint check fails; Prettier may update files, which should be reviewed and
staged before committing again.

### How they differ

| Tool     | Primary responsibility                                                 | When it runs                              |
| -------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| ESLint   | Finds code-quality, TypeScript, Angular, and template-rule violations. | On `npm run lint` and before commits.     |
| Prettier | Makes source formatting consistent.                                    | On `npm run prettier` and before commits. |
| Husky    | Connects project commands to Git hooks.                                | During Git actions such as `pre-commit`.  |
