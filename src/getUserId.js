const driver = require("bigchaindb-driver");

const getUserId = async (userString) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  var result = {};
  await conn.searchAssets(userString).then(
    (res) => {
      if (res.length == 0) {
        result = { status: "error", message: "User not found" };
      } else result = { status: "success", user: res[0] };
    },
    (err) => {
      result = { status: "error", message: "User not found" };
    }
  );

  return result;
};

//get userId to get all transactions done by the user.
module.exports = { getUserId };
