const driver = require("bigchaindb-driver");

const userExist = async (userString) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  var result = {};
  await conn.searchAssets(userString).then(
    (res) => {
      if (res.length == 0) {
        result = { status: "error", message: "User not found" };
      } else {
        res.forEach((element) => {
          if (element.data.user != undefined)
            result = { status: "success", userExist: true };
        });
      }
    },
    (err) => {
      result = { status: "error", userExist: false };
    }
  );

  return result;
};

//get userId to get all transactions done by the user.
module.exports = { userExist };
