# Tinder-like Dating App

This is a simple dating application inspired by Tinder. It uses Node.js with Express for the backend and vanilla JavaScript for the frontend. User data is stored in memory for demonstration purposes.

## Features

- Register and log in with a username and password
- Swipe like/pass on other users
- View matches when both users like each other

## Getting Started

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

*Note: This project is for demo purposes and does not include persistent storage or authentication best practices.*

## Deploying to GitHub Pages

You can publish the static frontend from the `public` directory using GitHub Pages. After installing dependencies, run:

```bash
npm run deploy
```

This command uses the `gh-pages` package to push the contents of `public` to a `gh-pages` branch, making the site available at `https://<username>.github.io/<repository>`. The Express backend does not run on GitHub Pages, so dynamic features require running the server locally with `npm start`.
