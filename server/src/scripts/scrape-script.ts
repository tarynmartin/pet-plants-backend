/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const jsdom = require('jsdom');

// Define the URL to scrape
const url = 'https://example.com';

// Use axios to fetch the webpage content
const scrape = () => {
  // const response = await axios.get(url);
  //do something with gotten

  axios.get(url)
    .then(response => {
      const dom = new jsdom.JSDOM(response.data);
      const document = dom.window.document;

      const title = document.querySelector('title').textContent;
      // const description = document.querySelector('meta[name="description"]')?.content ?? "[no description]";
      const contents = document.querySelectorAll("p");

      console.log("Page Title: ", title);
      // console.log("Page Description: ", description);
      console.log("Page Content: ");
      contents.forEach(p => console.log(`<p>${p.textContent}</p>`));

    })
    .catch(error => {
      console.error('Error fetching webpage content: ', error);
    });
};

scrape();