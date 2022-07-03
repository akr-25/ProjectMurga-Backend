const {
  Batch,
  Transaction,
  BalanceLog,
  FeedConsumptionLog,
  Request,
  PriceLog,
  User,
} = require("../models");
const { getBatchCode } = require("../utils/getBatchCode");
const { generateCSV } = require("../scripts/makecsv");
const { customError } = require("../utils/customError");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

module.exports = {
  addBatch: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { type, sub_type } = req.body;

      const batch_code = getBatchCode(type, sub_type);
      const search_code = String(batch_code + "%");

      const last_batch = await Batch.findOne({
        raw: true,
        where: {
          batch_id: { [Op.like]: search_code },
        },
        order: [["createdAt", "DESC"]],
      });

      let lastid = 0;
      if (last_batch != null) {
        v = last_batch.batch_id.toString();
        lastid = v.split("-")[1];
      }

      if (lastid == null) lastid = 0;

      const new_id = String(batch_code + "-" + (Number(lastid) + 1));

      const batch = await Batch.create({
        batch_id: new_id,
      });

      const balancelog = await BalanceLog.create({
        unit_id: new_id,
        net_balance_type1: 0,
        net_balance_type2: 0,
        type_of_change: "Initialization",
      });

      return res
        .status(201)
        .send({ error: null, message: "success", data: { batch, balancelog } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  updateBatch: async (req, res, next) => {
    //? needed for deactivating a batch

    try {
      const { is_active, batch_id } = req.body;

      const rows_updated = await Batch.update(
        { is_active: is_active },
        {
          where: { batch_id: batch_id },
        }
      );
      //TODO: check if the batch even exists or not!
      //* if there is no batch then rows_updated == 0 !!

      if (rows_updated == 0) {
        throw new customError(`no batch with batch_id = ${batch_id} found`);
      }

      return res
        .status(200)
        .send({ error: null, message: "success", data: { batch } });
    } catch (err) {
      next(err);
    }
  },

  fetchBatchTransactions: async (req, res, next) => {
    const { id } = req.params;

    try {
      const transaction = await Batch.findOne({
        where: { batch_id: id },
      });
      return res
        .status(200)
        .send({ error: null, message: "success", data: { transaction } });
    } catch (err) {
      next(err);
    }
  },

  fetchBatch: async (req, res, next) => {
    let { state } = req.query;

    if (state == null) state = "Y";

    try {
      const batch = await Batch.findAll({
        where: { is_active: state },
        include: Transaction,
      });
      return res
        .status(200)
        .send({ error: null, message: "success", data: { batch } });
    } catch (err) {
      next(err);
    }
  },
  getCSV: async (req, res) => {
    try {
      const batch = await Batch.findOne({
        where: { batch_id: req.params.id },
        include: [
          { model: BalanceLog },
          { model: FeedConsumptionLog },
          { model: PriceLog },
          { model: Request },
        ],
      });
      var finalData = [];
      if (
        req.params.id.substr(0, 2) == "CC" ||
        req.params.id.substr(0, 2) == "DD"
      ) {
        //condition for chick
        startDate = batch.createdAt;
        endDate = batch.updatedAt;

        var date1 = new Date(startDate);
        var date2 = new Date(endDate);
        if (batch.is_active == "Y") {
          date2 = new Date(); //today's date
        }

        let loop = new Date(date1);

        cumSum = 0; //inital value kaise aaega?

        while (loop <= date2) {
          var jsonData = {
            date: loop.toLocaleDateString(),
            unit_id: "NA",
            previous_balance: "0",
            Chick_Born: "0",
            Mortality: "0",
            Total: "0",
            type_of_unit: "NA",
            Feed_Consumption_Rate: "0",
            Feed_Cost: "0",
            Total_Feed_Consumed: "0", //automated
            Sale: "0", //(units sold)
            Buyer_info: "NA",
            Sale_Rate: "0",
            Amount: "0",
            order_type: "NA",
          };
          jsonData["unit_id"] = req.params.id;

          for (var i = 0; i < batch.Requests.length; ++i) {
            let obj = batch.Requests[i];
            if (
              loop.toLocaleDateString() ===
              new Date(obj.updatedAt).toLocaleDateString()
            ) {
              if (obj.order_status == "completed") {
                jsonData["Buyer_info"] = (
                  await User.findOne({ where: { user_id: obj.applicant_id } })
                ).first_name;
                // jsonData["order_status"] = obj.order_status;
                jsonData["type_of_unit"] = "chick";
                jsonData["Sale"] = obj.req_no_of_units_type1; //there is only one type in chick
                jsonData["Sale_Rate"] = obj.selling_price_per_unit;
                jsonData["order_type"] = obj.order_type;
                jsonData["Amount"] = (
                  parseInt(jsonData["Sale_Rate"]) * parseInt(jsonData["Sale"])
                ).toString();
                // jsonData["order_type"] = obj.order_type;
              }
            }
          }
          for (var i = 0; i < batch.BalanceLogs.length; ++i) {
            let obj = batch.BalanceLogs[i];
            if (
              loop.toLocaleDateString() ===
              new Date(obj.updatedAt).toLocaleDateString()
            ) {
              jsonData["previous_balance"] = cumSum.toString();
              //jsonData["type_of_change"] = obj.type_of_change;
              cumSum += parseInt(obj.net_balance_type1);
              s1 = "Birth";
              if (obj.type_of_change == "Birth") {
                jsonData["Chick_Born"] = obj.net_balance_type1;
              } else if (obj.type_of_change == "Death") {
                jsonData["Mortality"] = obj.net_balance_type1;
              }
              jsonData["Total"] = (
                parseInt(jsonData["previous_balance"]) +
                parseInt(jsonData["Chick_Born"]) -
                parseInt(jsonData["Mortality"])
              ).toString();
            }
          }
          for (var i = 0; i < batch.FeedConsumptionLogs.length; ++i) {
            let obj = batch.FeedConsumptionLogs[i];
            if (
              loop.toLocaleDateString() ===
              new Date(obj.updatedAt).toLocaleDateString()
            ) {
              jsonData["Feed_Consumption_Rate"] = obj.rate;
              jsonData["Feed_Cost"] = obj.cost_per_gram;

              jsonData["Total_Feed_Consumed"] =
                parseInt(obj.rate) * parseInt(jsonData["Total"]);
            }
          }
          let newDate = loop.setDate(loop.getDate() + 1);
          loop = new Date(newDate);
          finalData.push(jsonData);
        }

        //console.log(finalData);
        generateCSV(finalData, 2);
        res
          .status(200)
          .send({ error: null, message: "success", data: { batch } });
        // res
        //   .status(200)
        //   .send({ error: null, message: "success", data: { batch } });
      } else if (
        req.params.id.substr(0, 2) == "CG" ||
        req.params.id.substr(0, 2) == "DG"
      ) {
        //condition for grower
        startDate = batch.createdAt;
        endDate = batch.updatedAt;

        var date1 = new Date(startDate);
        var date2 = new Date(endDate);
        if (batch.is_active == "Y") {
          date2 = new Date(); //today's date
        }

        let loop = new Date(date1);
        cumSum_male = 0;
        cumSum_female = 0; //inital value kaise aaega?

        while (loop <= date2) {
          var jsonData = {
            date: loop.toLocaleDateString(),
            unit_id: "NA",
            previous_balance_male: "0",
            previous_balance_female: "0",
            Recieved_Male: "0",
            Recieved_Female: "0",
            Transfer_to_grower_Male: "0",
            Transfer_to_grower_Female: "0", //(chick->gr)
            Mortality_Male: "0",
            Mortality_Female: "0",
            type_of_unit: "NA",
            Total_Male: "0",
            Total_Female: "0",
            Feed_Consumption_Rate: "0",
            Feed_Cost: "0",
            Total_Feed_Consumed: "0", //automated
            Sale_Male: "0",
            Sale_Female: "0", //(units sold)
            Buyer_info: "NA",
            Sale_Rate: "0",
            Amount: "0",
            order_type: "NA",
          };
          jsonData["unit_id"] = req.params.id;

          for (var i = 0; i < batch.Requests.length; ++i) {
            let obj = batch.Requests[i];
            if (
              loop.toLocaleDateString() ===
              new Date(obj.updatedAt).toLocaleDateString()
            ) {
              if (obj.order_status == "completed") {
                jsonData["Buyer_info"] = (
                  await User.findOne({ where: { user_id: obj.applicant_id } })
                ).first_name;
                jsonData["type_of_unit"] = "grower";
                jsonData["Sale_Male"] = obj.req_no_of_units_type1;
                jsonData["Sale_Female"] = obj.req_no_of_units_type2;
                jsonData["Sale_Rate"] = obj.selling_price_per_unit;
                jsonData["order_type"] = obj.order_type;
                jsonData["Amount"] = (
                  parseInt(jsonData["Sale_Rate"]) *
                  parseInt(jsonData["Sale_Male"] + jsonData["Sale_Female"])
                ).toString();
              }
            }
          }

          for (var i = 0; i < batch.BalanceLogs.length; ++i) {
            let obj = batch.BalanceLogs[i];
            if (
              loop.toLocaleDateString() ===
              new Date(obj.updatedAt).toLocaleDateString()
            ) {
              jsonData["previous_balance_male"] = cumSum_male.toString();
              jsonData["previous_balance_female"] = cumSum_female.toString();

              //jsonData["type_of_change"] = obj.type_of_change;
              cumSum_male += parseInt(obj.net_balance_type1);
              cumSum_female += parseInt(obj.net_balance_type2);

              s1 = "Birth";
              if (obj.type_of_change.split(" ")[0] == "Converted") {
                jsonData["Transfer_to_grower_Male"] = obj.net_balance_type1;
                jsonData["Transfer_to_grower_Female"] = obj.net_balance_type2;
              } else if (obj.type_of_change == "Bought") {
                jsonData["Recieved_Male"] = obj.net_balance_type1;
                jsonData["Recieved_Female"] = obj.net_balance_type2;
              } else if (obj.type_of_change == "Death") {
                jsonData["Mortality_Male"] = obj.net_balance_type1;
                jsonData["Mortality_Female"] = obj.net_balance_type2;
              }
              jsonData["Total_Male"] = (
                parseInt(jsonData["previous_balance_male"]) +
                parseInt(jsonData["Recieved_Male"]) +
                parseInt(jsonData["Transfer_to_grower_Male"]) -
                parseInt(jsonData["Mortality_Male"])
              ).toString();
              jsonData["Total_Female"] = (
                parseInt(jsonData["previous_balance_female"]) +
                parseInt(jsonData["Recieved_Female"]) +
                parseInt(jsonData["Transfer_to_grower_Female"]) -
                parseInt(jsonData["Mortality_Female"])
              ).toString();
            }
          }
          for (var i = 0; i < batch.FeedConsumptionLogs.length; ++i) {
            let obj = batch.FeedConsumptionLogs[i];
            if (
              loop.toLocaleDateString() ===
              new Date(obj.updatedAt).toLocaleDateString()
            ) {
              jsonData["Feed_Consumption_Rate"] = obj.rate;
              jsonData["Feed_Cost"] = obj.cost_per_gram;
              jsonData["Total_Feed_Consumed"] = (
                parseInt(obj.rate) *
                (parseInt(jsonData["Total_Male"]) +
                  parseInt(jsonData["Total_Female"]))
              ).toString();
            }
          }
          let newDate = loop.setDate(loop.getDate() + 1);
          loop = new Date(newDate);
          finalData.push(jsonData);
        }
        // console.log(finalData);
        generateCSV(finalData, 3);
        res
          .status(200)
          .send({ error: null, message: "success", data: { batch } });
      } else if (
        req.params.id.substr(0, 2) == "CE" ||
        req.params.id.substr(0, 2) == "DE"
      ) {
        //condition for egg
        startDate = batch.createdAt;
        endDate = batch.updatedAt;

        var date1 = new Date(startDate);
        var date2 = new Date(endDate);
        if (batch.is_active == "Y") {
          date2 = new Date(); //today's date
        }

        let loop = new Date(date1);
        cumSum_table = 0;
        cumSum_hatching = 0; //inital value kaise aaega?

        while (loop <= date2) {
          var jsonData = {
            date: loop.toLocaleDateString(),
            unit_id: "NA",
            previous_balance_table: "0",
            previous_balance_hatching: "0",
            Produced_Table: "0",
            Produced_Hatching: "0",

            type_of_unit: "NA",
            Total_Table: "0",
            Total_Hatching: "0",
            Sale_Table: "0",
            Sale_Hatching: "0", //(units sold)
            Buyer_info: "NA",
            Sale_Rate: "0",
            Amount: "0",
            order_type: "NA",
          };
          jsonData["unit_id"] = req.params.id;

          for (var i = 0; i < batch.Requests.length; ++i) {
            let obj = batch.Requests[i];
            if (
              loop.toLocaleDateString() ===
              new Date(obj.updatedAt).toLocaleDateString()
            ) {
              if (obj.order_status == "completed") {
                jsonData["Buyer_info"] = (
                  await User.findOne({ where: { user_id: obj.applicant_id } })
                ).first_name;
                jsonData["type_of_unit"] = "egg";
                jsonData["Sale_Table"] = obj.req_no_of_units_type1;
                jsonData["Sale_Hatching"] = obj.req_no_of_units_type2;
                jsonData["Sale_Rate"] = obj.selling_price_per_unit;
                jsonData["order_type"] = obj.order_type;
                jsonData["Amount"] = (
                  parseInt(jsonData["Sale_Rate"]) *
                  parseInt(jsonData["Sale_Table"] + jsonData["Sale_Hatching"])
                ).toString();
              }
            }
          }

          for (var i = 0; i < batch.BalanceLogs.length; ++i) {
            let obj = batch.BalanceLogs[i];
            if (
              loop.toLocaleDateString() ===
              new Date(obj.updatedAt).toLocaleDateString()
            ) {
              jsonData["previous_balance_table"] = cumSum_table.toString();
              jsonData["previous_balance_hatching"] =
                cumSum_hatching.toString();

              //jsonData["type_of_change"] = obj.type_of_change;
              cumSum_table += parseInt(obj.net_balance_type1);
              cumSum_hatching += parseInt(obj.net_balance_type2);

              s1 = "Birth";
              if (obj.type_of_change == "Birth") {
                jsonData["Produced_Table"] = obj.net_balance_type1;
                jsonData["Produced_Hatching"] = obj.net_balance_type2;
              }
              jsonData["Total_Table"] = (
                parseInt(jsonData["previous_balance_table"]) +
                parseInt(jsonData["Produced_Table"])
              ).toString();
              jsonData["Total_Hatching"] = (
                parseInt(jsonData["previous_balance_hatching"]) +
                parseInt(jsonData["Produced_Hatching"])
              ).toString();
            }
          }

          let newDate = loop.setDate(loop.getDate() + 1);
          loop = new Date(newDate);
          finalData.push(jsonData);
        }
        generateCSV(finalData, 1);
        res
          .status(200)
          .send({ error: null, message: "success", data: { batch } });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: e, message: "failure", data: null });
    }
  },
};
