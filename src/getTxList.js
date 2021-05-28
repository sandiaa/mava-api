const driver = require("bigchaindb-driver");
const getUserId = require("./getUserId");

const getTxList = async (number) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  var userId = "";
  var result = {};

  await getUserId.getUserId(number).then(
    (res) => {
      if (res.status == "error") {
        result = { status: "error", message: "No Transaction found" };
      } else userId = res.user.id;
    },
    (err) => {
      console.log(err);
      result = { status: "error", message: "No Transaction found" };
    }
  );
  if (userId) {
    await conn.searchAssets(userId).then(
      (res) => {
        result = res;
      },
      (err) => {
        result = { status: "error", message: "No Transaction found" };
      }
    );
  }

  return result;
};

//get userId to get all transactions done by the user.
module.exports = { getTxList };
