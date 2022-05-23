const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const dataDir = path.join(__dirname, '../datas/data');

// URL of the page we want to scrape
const url =
  "https://www.amazon.in/s?k=laptop&crid=DZ2L43JHFM9B&sprefix=lap%2Caps%2C352&ref=nb_sb_ss_ts-doa-p_2_3";

const scrapeStaticWebpage = async () => {
  try {
    const { data } = await axios.get(url);
     processData(data);
  } catch (err) {
    console.log("error", err);
  }
};

function processData(data) {
   const $ = cheerio.load(data);
  const list = $(".col-xs-6");
  console.log(list.length);
  const listItems = $(list.children());
  const items = [];
  list.each(function (idx, ele) {
    const targeted = $(ele);
    const link = targeted.find("a").attr("href");
    const img = targeted.find("img").attr("src");
     const name = targeted.find("h4").text().trim();
    const price = targeted.find("span.text-green-600").text().trim();
    const rating = targeted.find("i.a-icon-star").text();
    const item = {
      id: idx + 1,
      name: name,
      link: link,
      img: img,
      price: price,
      rating: rating

    };
    items.push(item);
  });
 
  fs.writeFile(
    `${dataDir}`,
    JSON.stringify(items, null, 2),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    }
  );
}

module.exports = scrapeStaticWebpage;