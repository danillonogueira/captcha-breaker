const puppeteer = require('puppeteer');

require('dotenv').config();

const options = { 
  headless: false,
  slowMo: 50
};

require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  console.log('Navigating to LinkedIn');
  await Promise.all([
    page.waitForNavigation(),
    page.goto('https://www.linkedin.com/home')
  ]);

  console.log('Clicking sign in button');
  await Promise.all([
    page.waitForNavigation(),
    page.click('.nav__button-secondary')
  ]);

  console.log('Typing email...')
  await page.type('#username', process.env.EMAIL);

  console.log('Typing password...')
  await page.type('#password', process.env.PASSWORD);

  console.log('Logging in...')
  await page.click('.btn__primary--large');

  await Promise.all([
    page.waitForNavigation(),
    console.log('SUCCESS')
  ]);
})();