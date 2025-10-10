A simple SPA Portfolio template for developer/designers built with React and Vite. Use it to showcase your work, testimonials and other information to clients. Updated for my own purposes.

## Preview
![Preview](https://matthewdbaldwin.com/images/preview.jpg)

## Prerequisites
- [Node.js](https://nodejs.org/) 18 or newer (Vite 5+ requires Node 18). Using the latest LTS release is recommended.
- npm (bundled with Node). Yarn, pnpm, or bun will also work if you prefer them—adjust the commands accordingly.

## Run the site locally
1. Clone or download this repository and `cd` into the project folder.
2. Install dependencies with `npm install` (only required the first time or when dependencies change).
3. Start the Vite development server with `npm run dev`.
   * Vite will print a local URL (default: http://localhost:5173) as well as a network URL for testing on other devices.
   * Press <kbd>o</kbd> in the terminal to open the site in your default browser, or stop the server with <kbd>Ctrl</kbd>+<kbd>C</kbd> when you are done.
4. Update the content in `src/resumeData.jsx` (and any components you need) to customize the portfolio.

## Build for production
When you are ready to deploy, run `npm run build` to generate the static site in the `dist/` directory. You can preview the production build locally with `npm run preview` after running the build command.

