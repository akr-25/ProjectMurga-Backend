const { promises: fs } = require("fs");
const createCSVwriter = require("csv-writer").createObjectCsvWriter;

const csvWriter1 = createCSVwriter({
  path: "./egg.csv",
  header: [
    "date",
    "unit_id",
    "previous_balance_table",
    "previous_balance_hatching",
    "Produced_Table",
    "Produced_Hatching",

    "type_of_unit",
    "Total_Table",
    "Total_Hatching",
    "Sale_Table",
    "Sale_Hatching", //(units sold)
    "Buyer_info",
    "Sale_Rate",
    "Amount",
    "order_type",
  ].map((item) => ({ id: item, title: item })),
});

const csvWriter2 = createCSVwriter({
  path: "./chick.csv",
  header: [
    "date",
    "unit_id",
    "previous_balance",
    "Chick_Born",
    "Mortality",
    "Total",
    "type_of_unit",
    "Feed_Consumption_Rate",
    "Feed_Cost",
    "Total_Feed_Consumed", //automated
    "Sale", //(units sold)
    "Buyer_info",
    "Sale_Rate",
    "Amount",
    "order_type",
  ].map((item) => ({ id: item, title: item })),
});
const csvWriter3 = createCSVwriter({
  path: "./grower.csv",
  header: [
    "date",
    "unit_id",
    "previous_balance_male",
    "previous_balance_female",
    "Recieved_Male",
    "Recieved_Female",
    "Transfer_to_grower_Male",
    "Transfer_to_grower_Female", //(chick->gr)
    "Mortality_Male",
    "Mortality_Female",
    "type_of_unit",
    "Total_Male",
    "Total_Female",
    "Feed_Consumption_Rate",
    "Feed_Cost",
    "Total_Feed_Consumed", //automated
    "Sale_Male",
    "Sale_Female", //(units sold)
    "Buyer_info",
    "Sale_Rate",
    "Amount",
    "order_type",
  ].map((item) => ({ id: item, title: item })),
});
module.exports = {
  generateCSV: async function (finalData, type) {
    try {
      if (type == 1) await csvWriter1.writeRecords(finalData);
      if (type == 2) await csvWriter2.writeRecords(finalData);

      if (type == 3) await csvWriter3.writeRecords(finalData);
    } catch (e) {
      console.log(e);
    }
  },
};
