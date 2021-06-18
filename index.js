"use strict";

const puppeteer = require('puppeteer');
const polka = require('polka');

const { getDocument, queries } = require('pptr-testing-library')
const { findByText } = queries;

const PAGE_WIDTH = 768;
const PAGE_HEIGHT= 1024;
const SERVER_PORT = 3000;

let browser;
let page;
let $document;
let ready;
let waitForReady = new Promise((resolve) => (ready = resolve));

(async () => {
    browser = await puppeteer.launch({
        headless : false,
        defaultViewport : {
            width: Math.floor(PAGE_WIDTH),
            height: Math.floor(PAGE_HEIGHT * 0.9),
        },

        args: [
            `--window-size=${PAGE_WIDTH},${PAGE_HEIGHT}`,
        ]
    });
    
    page = await browser.newPage();
    
    await page.goto("https://buzzin.live/host");
    
    $document = await getDocument(page)

    ready();
})();

polka()
    .get('/ready', async (req, res) => {
        await waitForReady;

        res.end("I'm ready");
    })
    .get('/start', async (req, res) => {
        await waitForReady;

        const $button = await findByText($document, "Create", { selector : "button" });

        await $button.click();

        res.end("Starting");
    })
    .get('/', (req, res) => {
        console.log(req);

        res.end(`Hi`);
    })
    .listen(SERVER_PORT, () => {
        console.log(`> Running on localhost:${SERVER_PORT}`);

        waitForReady.then(() => console.log("Headless browser is ready"));
    });

