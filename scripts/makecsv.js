const { promises: fs } = require("fs");
const createCSVwriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCSVwriter({
  path: "./batch.csv",
  header: [
    "date",
    "net_balance_type1",
    "net_balance_type2",
    "type_of_change",
    "rate",
    "cost_per_gram",
    "price_per_unit",
  ].map((item) => ({ id: item, title: item })),
});

module.exports = {
  generateCSV: async function (finalData) {
    try {
      await csvWriter.writeRecords(finalData);
    } catch (e) {
      console.log(e);
    }
  },
};
