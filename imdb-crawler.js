// https://www.imdb.com/chart/top/

const puppeteer = require('puppeteer');
const fs = require('fs');

const options = { 
  headless: true,
};

const writeTxt = (movies) => {
  movies.forEach((movie) => fs.appendFileSync('movies.txt', `${movie}\n`))
};

(async () => {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  console.log('Navigating to IMDB...');
  await page.goto('https://www.imdb.com/chart/top/');

  console.log('Getting movies...');
  await page.$$eval('.lister-list tr .titleColumn a', (movies) => {
    const _movies = (movies.map(movieEl => movieEl.textContent));

    return new Promise((resolve, reject) => {
      if (_movies.length) {
        resolve(_movies);
      }

      reject();
    });
  })
    .then((movies) => {
      console.log(movies);
      // writeTxt(movies);
    });
})();