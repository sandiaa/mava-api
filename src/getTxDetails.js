const driver = require("bigchaindb-driver");
const getUserId = require("./getUserId");

const getTxDetails = async (assetId) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  var result = {};

  await conn.searchMetadata(assetId).then(
    (res) => {
      result = { status: "success", data: res };
    },
    (err) => {
      result = { status: "error", message: "No Transaction found" };
    }
  );

  return result;
};

//get userId to get all transactions done by the user.
module.exports = { getTxDetails };
