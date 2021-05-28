const driver = require("bigchaindb-driver");
const createKeys = require("./createKeys");
const getUserId = require("./getUserId");
const requestSenderTransfer = require("./requestSenderTransfer");
const createNewTx = async (data) => {
  //code for create transaction
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  const senderId = await getUserId.getUserId(data.sender);
  const receiverId = await getUserId.getUserId(data.receiver);
  const newTransaction = {
    id: data.id,
    receiverId: receiverId,
    senderId: senderId,
    homeCurrency: data.homeCurrency,
    receiverCurrency: data.receiverCurrency,
    createdAt: new Date(),
    amount: data.amount,
    expiry: data.expiry,
    description: data.description,
    amountInHomeCurrency: data.amountInHomeCurrency,
  };
  const transactionMetadata = {
    senderStatus: "REQUEST_SENT",
    receiverStatus: "REQUEST_RECEIVED",
    finalStatus: "NOT_SET",
    createdAt: new Date(),
  };
  const senderKeys = await createKeys.createKeys(data.sender);

  const tx = driver.Transaction.makeCreateTransaction(
    { newTransaction },
    { transactionMetadata },
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(senderKeys.publicKey)
      ),
    ],
    senderKeys.publicKey
  );
  const txSigned = driver.Transaction.signTransaction(
    tx,
    senderKeys.privateKey
  );
  var result = {};
  await conn.postTransactionCommit(txSigned).then(
    (res) => {
      result = { status: "success", id: res.id };
    },
    (err) => {
      result = { status: "error", message: "Transaction not created" };
    }
  );
  if (result.status == "success") {
    await requestSenderTransfer
      .requestSenderTransfer(result.id, data.sender, data.receiver)
      .then(
        (res) => {
          result = { status: "success", data: res };
        },
        (err) => {
          result = { status: "error", message: "Transaction not created" };
        }
      );
  }
  return result;
};

module.exports = { createNewTx };
