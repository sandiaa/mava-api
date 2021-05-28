const driver = require("bigchaindb-driver");
const createKeys = require("./createKeys");

const createUser = async (data) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");

  const userExists = await conn.searchAssets(data.number);
  if (userExists.length != 0) {
    return { status: "error", message: "Phone Number already exists" };
  }
  //code for user creation
  var result = {};
  const user = {
    id: data.id,
    number: data.number,
    createdAt: new Date(),
  };
  const metaData = {
    pin: data.pin,
    // have to setup user-settings
  };

  const newUser = await createKeys.createKeys(data.number);

  const tx = driver.Transaction.makeCreateTransaction(
    { user },
    { metaData },
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(newUser.publicKey)
      ),
    ],
    newUser.publicKey
  );

  const txSigned = driver.Transaction.signTransaction(tx, newUser.privateKey);

  await conn.postTransactionCommit(txSigned).then(
    (res) => {
      result = { status: "success", id: res.id };
    },
    (err) => {
      result = { status: "error", message: "User not created" };
    }
  );
  return result;
};

module.exports = { createUser };
