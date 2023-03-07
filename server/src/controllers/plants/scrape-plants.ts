import { RequestHandler } from "express";

const scrapePlants: RequestHandler = async (req, res) => {

  //TODO: This handler would kick off the scrape process.
  // Q: How long does the Scrape process take? If it is longer than 20-30 seconds,
  //  we may want to consider making it an out-of-process operation. There are a couple
  //  different ways we could handle that, which we can discuss.

  //For now, let's just return a response saying we're at the right route
  const json = {
    ok: true,
    message: "not implemented: this route would kick off the scraping process",
  };

  res.status(200).json(json);
};

export default scrapePlants;