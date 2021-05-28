const driver = require("bigchaindb-driver");
const bip39 = require("bip39");
const toUnicode = require("./toUnicode");

const createKeys = async (id) => {
  const userString = toUnicode.toUnicode(id);
  const seed = await bip39.mnemonicToSeed(userString);
  const user = new driver.Ed25519Keypair(seed.slice(0, 32));
  return user;
};
module.exports = { createKeys };
