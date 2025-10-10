A simple SPA Portfolio template for developer/designers built with React and Vite. Use it to showcase your work, testimonials and other information to clients. Updated for my own purposes.

## Preview
![Preview](https://matthewdbaldwin.com/images/preview.jpg)

### Generate a fresh preview locally
If you would like to grab an up-to-date screenshot of the site:

1. Run `npm run dev -- --host 0.0.0.0` so the Vite server is reachable from the browser tooling in this repository.
2. Open the printed local URL in your browser or automation tool of choice (the default is http://localhost:5173).
3. Capture your screenshot. In this workspace we use Playwright to automate the browser and save an image artifact.

Stop the dev server with <kbd>Ctrl</kbd>+<kbd>C</kbd> after you capture the preview.

## Prerequisites
- [Node.js](https://nodejs.org/) 18 or newer (Vite 5+ requires Node 18). Using the latest LTS release is recommended.
- npm (bundled with Node). Yarn, pnpm, or bun will also work if you prefer them—adjust the commands accordingly.

## Check out this branch locally

If you have not cloned the repository yet:

```bash
git clone https://github.com/<your-account>/job-portfolio.git
cd job-portfolio
```

Then fetch and check out the branch:

```bash
git fetch origin work
git checkout work
```

If you already have a local clone, run `git pull` first to ensure it is up to date before fetching the branch.

### Update this branch later

When new commits land on the `work` branch and you want them locally:

```bash
git checkout work              # switch to the branch if you are not on it already
git pull --ff-only origin work # download the newest commits from the remote
```

If you have local edits you are not ready to keep, either commit/stash them before running the pull or replace the second command with `git fetch origin work && git reset --hard origin/work` to discard your changes and match the remote exactly.

## Run the site locally
1. Install dependencies with `npm install` (only required the first time or when dependencies change).
2. Start the Vite development server with `npm run dev`.
   * Vite will print a local URL (default: http://localhost:5173) as well as a network URL for testing on other devices.
   * Press <kbd>o</kbd> in the terminal to open the site in your default browser, or stop the server with <kbd>Ctrl</kbd>+<kbd>C</kbd> when you are done.
3. Update the content in `src/resumeData.jsx` (and any components you need) to customize the portfolio.

## Build for production
When you are ready to deploy, run `npm run build` to generate the static site in the `dist/` directory. You can preview the production build locally with `npm run preview` after running the build command.

> **Note:** Some operating systems block the Vite preview server from binding to the IPv6 loopback interface, which produces an `EACCES: permission denied ::1:4173` error. The default preview command now pins the server to the IPv4 loopback (`127.0.0.1`) so it runs without special permissions. If you need to test on other devices on your network, use `npm run preview:lan` (binds to `0.0.0.0`) or pass a custom `--host` flag.

