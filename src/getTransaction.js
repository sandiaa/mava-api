const driver = require("bigchaindb-driver");

const getTransaction = async (assetId) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  const asset = await conn.getTransaction(assetId);
  return asset;
};

module.exports = { getTransaction };
