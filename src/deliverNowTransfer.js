const driver = require("bigchaindb-driver");
const getTransaction = require("./getTransaction");
const createKeys = require("./createKeys");
const userId = require("./getUserId");

const deliverNowTransfer = async (txID, sender, receiver) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  const tx = await getTransaction.getTransaction(txID);
  const senderKeys = await createKeys.createKeys(sender);
  const receiverKeys = await createKeys.createKeys(receiver);

  const metadata = {
    assetId: txID,
    transferLevel: "AMOUNT_DELIVERED",
    senderStatus: "DELIVERED",
    receiverStatus: "DELIVERED",
    finalStatus: "DELIVERED",
    createdAt: new Date(),
  };
  const createTranfer = driver.Transaction.makeTransferTransaction(
    [
      {
        tx: tx,
        output_index: 0,
      },
    ],
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(receiverKeys.publicKey)
      ),
    ],
    metadata
  );

  const signedTX = driver.Transaction.signTransaction(
    createTranfer,
    senderKeys.privateKey
  );

  const result = conn.postTransactionCommit(signedTX);
  return result;
};

module.exports = { deliverNowTransfer };
