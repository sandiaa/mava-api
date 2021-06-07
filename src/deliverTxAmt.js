const driver = require("bigchaindb-driver");
const getTransaction = require("./getTransaction");
const createKeys = require("./createKeys");
const userId = require("./getUserId");

const deliverTxAmt = async (data) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  const tx = await getTransaction.getTransaction(data.id);
  const senderKeys = await createKeys.createKeys("MAVA");
  const receiverKeys = await createKeys.createKeys("MAVA");
  const metadata = {
    assetId: data.assetId,
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
  await conn.postTransactionCommit(signedTX).then(
    (res) => {
      result = { status: "success", data: res };
    },
    (err) => {
      result = { status: "error", message: "Transaction amount not delivered" };
    }
  );
  return result;
};

module.exports = { deliverTxAmt };
