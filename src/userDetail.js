const driver = require("bigchaindb-driver");

const userDetail = async (userString) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  var result = {};
  await conn.searchAssets(userString).then(
    (res) => {
      if (res.length == 0) {
        result = { status: "error", message: "User not found" };
      } else {
        res.forEach((element) => {
          if (element.data.user != undefined)
            result = { status: "success", user: element.data.user };
        });
      }
    },
    (err) => {
      result = { status: "error", userExist: "User not found" };
    }
  );

  return result;
};

//get userId to get all transactions done by the user.
module.exports = { userDetail };
