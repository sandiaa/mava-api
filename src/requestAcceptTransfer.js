const driver = require("bigchaindb-driver");
const getTransaction = require("./getTransaction");
const createKeys = require("./createKeys");
const userId = require("./getUserId");

const requestAcceptTransfer = async (data) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  const tx = await getTransaction.getTransaction(data.id);
  const senderKeys = await createKeys.createKeys(data.sender);
  const receiverKeys = await createKeys.createKeys(data.receiver);

  const metadata = {
    assetId: data.assetId,
    transferLevel: "ACCEPT",
    senderStatus: "WORKING",
    receiverStatus: "WORKING",
    finalStatus: "NOT_SET",
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
      result = { status: "error", message: "Transaction not accepted" };
    }
  );
  return result;
};

module.exports = { requestAcceptTransfer };
