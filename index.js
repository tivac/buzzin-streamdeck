"use strict";

const puppeteer = require('puppeteer');
const polka = require('polka');

const { getDocument, queries } = require('pptr-testing-library')
const { findByText } = queries;

let browser;
let page;
let $document;
let ready;
let waitForReady = new Promise((resolve) => (ready = resolve));

(async () => {
    browser = await puppeteer.launch({
        headless : false,
        args: [
            "--window-size=1024,768",
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
    .listen(3000, () => {
        console.log(`> Running on localhost:3000`);
    });

