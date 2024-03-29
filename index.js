const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
// const CREDS = require('./creds');
// const mongoose = require('mongoose');
// const User = require('./models/user');

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, `./public/view/dialog.html`));
})

app.get('/screenshot', (req, res) => {
  run();
});
app.get('/data', (req, res) => {
  res.status(200).json({"good": "everything working"});

})
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log('app running on port 5000');
})

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  try {
  await page.goto('https://www.facebook.com/');
  console.log('before loading page')
  await page.screenshot({ path: `screenshots/shot${Math.floor(Math.random() * 100)}.png` });
  console.log(`successful screenshoted the page @ ${page.url()}`);
} catch (err) {
    console.log(`unable to load page @ ${page.url()}`);
}

}
  // await page.goto('https://github.com/login');


  // // dom element selectors
  // const USERNAME_SELECTOR = '#login_field';
  // const PASSWORD_SELECTOR = '#password';
  // const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

  // await page.click(USERNAME_SELECTOR);
  // await page.keyboard.type(CREDS.username);

  // await page.click(PASSWORD_SELECTOR);
  // await page.keyboard.type(CREDS.password);

  // await page.click(BUTTON_SELECTOR);
  // await page.waitForNavigation();

  // const userToSearch = 'john';
  // const searchUrl = `https://github.com/search?q=${userToSearch}&type=Users&utf8=%E2%9C%93`;
  // // let searchUrl = 'https://github.com/search?utf8=%E2%9C%93&q=bashua&type=Users';

  // await page.goto(searchUrl);
  // await page.waitFor(2 * 1000);

  // // const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > a';
  // const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > a';
  // // const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > ul > li:nth-child(2) > a';
  // const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > ul > li:nth-child(2) > a';
  // const LENGTH_SELECTOR_CLASS = 'user-list-item';
  // const numPages = await getNumPages(page);

  // console.log('Numpages: ', numPages);

  // for (let h = 1; h <= numPages; h++) {
  //   let pageUrl = searchUrl + '&p=' + h;
  //   await page.goto(pageUrl);

  //   let listLength = await page.evaluate((sel) => {
  //     return document.getElementsByClassName(sel).length;
  //   }, LENGTH_SELECTOR_CLASS);

  //   for (let i = 1; i <= listLength; i++) {
  //     // change the index to the next child
  //     let usernameSelector = LIST_USERNAME_SELECTOR.replace("INDEX", i);
  //     let emailSelector = LIST_EMAIL_SELECTOR.replace("INDEX", i);

  //     let username = await page.evaluate((sel) => {
  //       return document.querySelector(sel).getAttribute('href').replace('/', '');
  //     }, usernameSelector);

  //     let email = await page.evaluate((sel) => {
  //       let element = document.querySelector(sel);
  //       return element ? element.innerHTML : null;
  //     }, emailSelector);

  //     // not all users have emails visible
  //     if (!email)
  //       continue;

  //     console.log(username, ' -> ', email);

  //     upsertUser({
  //       username: username,
  //       email: email,
  //       dateCrawled: new Date()
  //     });
  //   }
  // }

  // browser.close();
// }

async function getNumPages(page) {
  const NUM_USER_SELECTOR = '#js-pjax-container > div > div.columns > div.column.three-fourths.codesearch-results > div > div.d-flex.flex-justify-between.border-bottom.pb-3 > h3';

  let inner = await page.evaluate((sel) => {
    let html = document.querySelector(sel).innerHTML;

    // format is: "69,803 users"
    return html.replace(',', '').replace('users', '').trim();
  }, NUM_USER_SELECTOR);

  const numUsers = parseInt(inner);

  console.log('numUsers: ', numUsers);

  /**
   * GitHub shows 10 resuls per page, so
   */
  return Math.ceil(numUsers / 10);
}

function upsertUser(userObj) {
  const DB_URL = 'mongodb://localhost/thal';

  if (mongoose.connection.readyState == 0) {
    mongoose.connect(DB_URL);
  }

  // if this email exists, update the entry, don't insert
  const conditions = {
    email: userObj.email
  };
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  User.findOneAndUpdate(conditions, userObj, options, (err, result) => {
    if (err) {
      throw err;
    }
  });
}

// run();