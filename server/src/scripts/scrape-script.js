/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require('puppeteer');
const firebase = require("../lib/firebase-node.js");

// Define the URL to scrape
const catsURL = 'https://www.aspca.org/pet-care/animal-poison-control/cats-plant-list';
const dogsURL = 'https://www.aspca.org/pet-care/animal-poison-control/dogs-plant-list'
const sectionDiv = '.view-all-plants-list'


// Use axios to fetch the webpage content
const scrape = async (url) => {
  const scrappedData = []
  let _browser;

  const urls = await puppeteer.launch()
    .then(browser => {
      _browser = browser;
      return _browser.newPage()
    })
    .then(async page => {
    await page.goto(url);
    await page.waitForSelector('.view-all-plants-list')
    return await page.evaluate(sectionDiv => {
      const links = [...document.querySelectorAll('.view-content > .views-row')].map(el => el.querySelector('a').href)
      return links;
    }, sectionDiv)
  })
  
     const pagePromise = async (link) => {
        const page = await _browser.newPage()
        await page.goto(link)
        let dataObj = {};
        const commonNames = '.pane-node-field-additional-common-names'

        dataObj.image = await page.evaluate(() => {
          const image = document.querySelector('.field-item > img')?.getAttribute('src')
          return image ? image : ''
        })

        dataObj.name = await page.evaluate(() => {
          const name = document.querySelector('.pane-1 > h1')?.textContent
          return name ? name : ''
        })

        dataObj.popularNames = await page.evaluate(commonNames => {
        const names = document.querySelector('.field-name-field-additional-common-names > .field-items')?.textContent
        if (names) {
          const splitNames = names.split(": ")
          return splitNames[1].split(', ')
        }
        return [];
        }, commonNames)

        dataObj.scientificName = await page.evaluate(() => {
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

        dataObj.toxicCats = await page.evaluate(() => {
          const toxicity = document.querySelector('.field-name-field-toxicity > .field-items')?.textContent
          if (toxicity) {
            const splitName = toxicity.split(": ")
            return !splitName[1].includes['Non-Toxic to Cats'] && splitName[1].includes('Toxic to Cats')
          }
          return false;
        })

        dataObj.toxicDogs = await page.evaluate(() => {
          const toxicity = document.querySelector('.field-name-field-toxicity > .field-items')?.textContent
          if (toxicity) {
            const splitName = toxicity.split(": ")
            return !splitName[1].includes['Non-Toxic to Dogs'] && splitName[1].includes('Toxic to Dogs')
          }
          return false;
        })

        console.log('obj', dataObj);
        return dataObj;
        page.close()
      }

    let start = 0, end = 2;
    for(let i = start; i < end; i++) {
      const currentPageData = await pagePromise(urls[i]);
      // if(i++ < 3) {
        // console.log("add plant:", currentPageData);
        const res = await firebase.service().db.collection('plants').add(currentPageData)
        console.log("added plant, id: ", res.id);
      // }
      scrappedData.push(currentPageData)
    }

    await _browser.close();
    // scrappedData.forEach(async datum => {
    //   await firebaseService().db.collection('plants').add(datum);
    // })
  }

try {
  scrape(catsURL);
  // scrape(dogsURL);
} catch (e) {
  console.log('error', e)
}

//NOTE: You can run this script from a command line with the following command:
// node /path/to/scrape-script.ts
