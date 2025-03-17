const path = require('path');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

const CHROME_DRIVER_PATH = path.join(__dirname, 'chromedriver.exe');
const SCREENSHOT_PATH = './tests/results/';
const LOCAL_URL = 'http://localhost:3000';

const namesProcessed = require('../src/data/tNamesWLength.json');
// const namesProcessed = require('../src/data/tNamesTest.json') // Smaller file for testing script before sending in the BIG data
const { names } = namesProcessed;

const example = async () => {
  let driver = await new webdriver.Builder()
    .forBrowser(webdriver.Browser.CHROME)
    .setChromeService(new chrome.ServiceBuilder(CHROME_DRIVER_PATH))
    .build();

  try {
    await driver.get(LOCAL_URL);
    let i = 0;
    while (i < names.length) {
      const name = names[i];
      const middle = name.split(' ')[0];
      let nameElement = await driver.findElement(webdriver.By.id('name-div'));
      let smallNameElement = await driver.findElement(
        webdriver.By.id('lil-name-div')
      );
      await Promise.all([
        nameElement.takeScreenshot(),
        smallNameElement.takeScreenshot(),
      ])
        .then(async (results) => {
          const reg = results[0];
          const small = results[1];
          fs.writeFileSync(
            `${SCREENSHOT_PATH}${middle}-init.png`,
            reg,
            'base64'
          );
          fs.writeFileSync(
            `${SCREENSHOT_PATH}${middle}-init-sm.png`,
            small,
            'base64'
          );
          const opaqueButton = await driver.findElement(
            webdriver.By.id('opaque-button')
          );
          return opaqueButton.click();
        })
        .then(async () => {
          nameElement = await driver.findElement(webdriver.By.id('name-div'));
          smallNameElement = await driver.findElement(
            webdriver.By.id('lil-name-div')
          );
          return Promise.all([
            nameElement.takeScreenshot(),
            smallNameElement.takeScreenshot(),
          ]);
        })
        .then(async (results) => {
          const reg = results[0];
          const small = results[1];
          fs.writeFileSync(`${SCREENSHOT_PATH}${middle}.png`, reg, 'base64');
          fs.writeFileSync(
            `${SCREENSHOT_PATH}${middle}-sm.png`,
            small,
            'base64'
          );
          const nextButton = await driver.findElement(
            webdriver.By.id('next-button')
          );
          return nextButton.click();
        })
        .then(() => {
          i += 1;
        })
        .catch((e) => console.log(e));
    }
  } catch {
    console.log('cum');
  }
};

example();
