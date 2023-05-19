/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const puppeteer = require('puppeteer');

const sectionDiv = '.view-all-plants-list'

let _browser;
const getBrowserPage = async () => {
  if(!_browser){
    console.log("- creating new browser -");
    _browser = await puppeteer.launch();
  }

  return _browser.newPage();
}

const getPageLinks = async (url) => {

  console.log("getting browser and page...");
  const page = await getBrowserPage();

  console.log("loading url...");
  await page.goto(url);
  console.log("selecting the list...");
  await page.waitForSelector('.view-all-plants-list');

  console.log("evaluating the page...");
  const links = await page.evaluate(_ => {
    const rows = [...document.querySelectorAll('.view-content > .views-row')];
    const elements = rows.map(el => el.querySelector('a').href);
    return elements;
  }, sectionDiv);

  return links;
}

const getPlantFromLink = async (link) => {
  //TODO: look into re-using the browser and page, maybe just navigating again?
    console.log("getting browser and page...");
    const page = await getBrowserPage();

    console.log("navigating to link...");
    await page.goto(link);

    console.log("building plant object...");
    let dataObj = {};
    const commonNames = '.pane-node-field-additional-common-names'

    dataObj.image_url = await page.evaluate(() => {
      const image = document.querySelector('.field-item > img')?.getAttribute('src')
      return image ? image : ''
    })

    dataObj.name = await page.evaluate(() => {
      const name = document.querySelector('.pane-1 > h1')?.textContent
      return name ? name : ''
    })

    dataObj.popular_names = await page.evaluate(commonNames => {
    const names = document.querySelector('.field-name-field-additional-common-names > .field-items')?.textContent
    if (names) {
      const splitNames = names.split(": ")
      return splitNames[1].split(', ')
    }
    return [];
    }, commonNames)

    dataObj.scientific_name = await page.evaluate(() => {
    const name = document.querySelector('.field-name-field-scientific-name > .field-items')?.textContent
    if (name) {
      const splitName = name.split(": ")
      return splitName[1]
    }
    return '';
    })

    dataObj.family = await page.evaluate(() => {
    const familyName = document.querySelector('.field-name-field-family > .field-items')?.textContent
    if (familyName) {
      const splitName = familyName.split(": ")
      return splitName[1]
    }
    return '';
    })

    dataObj.signs = await page.evaluate(() => {
      const signs = document.querySelector('.field-name-field-clinical-signs > .field-items')?.textContent
      if (signs) {
        const splitName = signs.split(": ")
        return splitName[1]
      }
      return '';
    })

    dataObj.description = await page.evaluate(() => {
      const description = document.querySelector('.field-name-field-toxic-principles > .field-items')?.textContent
      if (description) {
        const splitName = description.split(": ")
        return splitName[1]
      }
      return '';
    })

    dataObj.toxic_cats = await page.evaluate(() => {
      const toxicity = document.querySelector('.field-name-field-toxicity > .field-items')?.textContent
      if (toxicity) {
        const splitName = toxicity.split(": ")
        return !splitName[1].includes['Non-Toxic to Cats'] && splitName[1].includes('Toxic to Cats')
      }
      return false;
    })

    dataObj.toxic_dogs = await page.evaluate(() => {
      const toxicity = document.querySelector('.field-name-field-toxicity > .field-items')?.textContent
      if (toxicity) {
        const splitName = toxicity.split(": ")
        return !splitName[1].includes['Non-Toxic to Dogs'] && splitName[1].includes('Toxic to Dogs')
      }
      return false;
    })

    page.close();

    return dataObj;
};

//EXPORT the getPageLinks function
exports.getPageLinks = getPageLinks;
exports.getPlantFromLink = getPlantFromLink;