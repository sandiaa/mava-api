const driver = require("bigchaindb-driver");

const verifyPin = async (userString, pin) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  var result = {};
  await conn.searchMetadata(userString).then(
    async (res) => {
      if (res.length == 0) {
        result = { status: "error", message: "Not verified" };
      } else {
        if (res[0].metadata.metaData.pin === pin) {
          result = { status: "success", message: "verified" };
        } else {
          result = { status: "error", message: "Not verified" };
        }
      }
    },
    (err) => {
      result = { status: "error", message: "Not verified" };
    }
  );

  return result;
};

//get userId to get all transactions done by the user.
module.exports = { verifyPin };
