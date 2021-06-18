# buzzin.live + streamdeck

## Install

1. Install node.js
2. npx degit tivac/buzzin-streamdeck
3. `cd buzzin-streamdeck`
4. `npm install`
5. `npm start`

You've now got a server running at http://localhost:3000 and a browser window showing http://buzzin.live that is scriptable.

## Routes
The server has a few routes:

### http://localhost:3000/ready

This will wait until puppeteer has booted the browser and the basic starting page has loaded

### http://localhost:3000/start

This will find the button to create a (free tier) game and click it, starting a game.

## Configuration

You can adjust the spawned browser's width/height by changing `index.js`, look for `const PAGE_WIDTH` and `const PAGE_HEIGHT` values to modify them.
