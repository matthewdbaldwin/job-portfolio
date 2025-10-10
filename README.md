A simple SPA Portfolio template for developer/designers built with React and Vite. Use it to showcase your work, testimonials and other information to clients. Updated for my own purposes.

## Preview
![Preview](https://matthewdbaldwin.com/images/preview.jpg)

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

## Run the site locally
1. Install dependencies with `npm install` (only required the first time or when dependencies change).
2. Start the Vite development server with `npm run dev`.
   * Vite will print a local URL (default: http://localhost:5173) as well as a network URL for testing on other devices.
   * Press <kbd>o</kbd> in the terminal to open the site in your default browser, or stop the server with <kbd>Ctrl</kbd>+<kbd>C</kbd> when you are done.
3. Update the content in `src/resumeData.jsx` (and any components you need) to customize the portfolio.

## Build for production
When you are ready to deploy, run `npm run build` to generate the static site in the `dist/` directory. You can preview the production build locally with `npm run preview` after running the build command.

> **Note:** Some operating systems block the Vite preview server from binding to the IPv6 loopback interface, which produces an `EACCES: permission denied ::1:4173` error. The default preview command now pins the server to the IPv4 loopback (`127.0.0.1`) so it runs without special permissions. If you need to test on other devices on your network, use `npm run preview:lan` (binds to `0.0.0.0`) or pass a custom `--host` flag.

