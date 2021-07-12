var express = require("express");
var app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

var createUser = require("./src/createUser");
var createNewTx = require("./src/createNewTx");
var createDeliverNow = require("./src/createDeliverNow");
var requestAcceptTransfer = require("./src/requestAcceptTransfer");
var txReviewSubmission = require("./src/txReviewSubmission");
var txDelivered = require("./src/txDelivered");
var deliverTxAmt = require("./src/deliverTxAmt");
var requestRejectTransfer = require("./src/requestRejectTransfer");
var refundAmount = require("./src/refundAmtDeliver");
var reviewUnsuccessful = require("./src/reviewUnsuccessful");
var getTxList = require("./src/getTxList");
var getUserId = require("./src/getUserId");
var getTxDetails = require("./src/getTxDetails");
var verifyPin = require("./src/verifyPin");
var userExist = require("./src/userExist");

app.post("/createUser", async function (req, res) {
  const data = {
    id: req.body.id,
    number: req.body.number,
    pin: req.body.pin,
    name: req.body.name,
  };
  const result = await createUser.createUser(data);
  if (result.status === "success") {
    res.status(200).send(result);
  } else {
    res.status(404).send("User not created");
  }
});

app.post("/createNewTx", async function (req, res) {
  const data = {
    id: req.body.id,
    receiverCurrency: req.body.receiverCurrency,
    amount: req.body.amount,
    expiry: req.body.expiry,
    description: req.body.description,
    sender: req.body.sender,
    receiver: req.body.receiver,
    paymentMode: req.body.paymentMode,
    receiverName: req.body.receiverName,
  };

  const result = await createNewTx.createNewTx(data);
  if (result.status === "success") {
    res.status(200).send(result);
  } else {
    res.status(404).send("Tx not created");
  }
});

app.post("/createDeliverNowTx", async function (req, res) {
  const data = {
    id: req.body.id,
    receiverCurrency: req.body.receiverCurrency,
    amount: req.body.amount,
    description: req.body.description,
    sender: req.body.sender,
    receiver: req.body.receiver,
    paymentMode: req.body.paymentMode,
    receiverName: req.body.receiverName,
  };

  const result = await createDeliverNow.createDeliverNow(data);
  if (result.status === "success") {
    res.status(200).send(result);
  } else {
    res.status(404).send("Tx not created");
  }
});

app.put("/acceptTx", async function (req, res) {
  const data = {
    id: req.body.id,
    assetId: req.body.assetId,
    sender: req.body.sender,
    receiver: req.body.receiver,
  };
  const result = await requestAcceptTransfer.requestAcceptTransfer(data);
  res.send(result);
});

app.put("/reviewTx", async function (req, res) {
  const data = {
    id: req.body.id,
    assetId: req.body.assetId,
    sender: req.body.sender,
    receiver: req.body.receiver,
  };
  const result = await txReviewSubmission.txReviewSubmission(data);
  res.send(result);
});

app.put("/deliverTx", async function (req, res) {
  const data = {
    id: req.body.id,
    assetId: req.body.assetId,
    sender: req.body.sender,
  };
  const result = await txDelivered.txDelivered(data);
  res.send(result);
});

app.put("/txAmountDeliver", async function (req, res) {
  const data = {
    id: req.body.id,
    assetId: req.body.assetId,
  };
  const result = await deliverTxAmt.deliverTxAmt(data);
  res.send(result);
});

app.put("/rejectTx", async function (req, res) {
  const data = {
    id: req.body.id,
    assetId: req.body.assetId,
    sender: req.body.sender,
  };
  const result = await requestRejectTransfer.requestRejectTransfer(data);
  res.send(result);
});

app.put("/refundAmtTx", async function (req, res) {
  const data = {
    id: req.body.id,
    assetId: req.body.assetId,
  };
  const result = await refundAmount.refundAmount(data);
  res.send(result);
});

app.put("/reviewNotSuccess", async function (req, res) {
  const data = {
    id: req.body.id,
    assetId: req.body.assetId,
    sender: req.body.sender,
    receiver: req.body.receiver,
  };
  const result = await reviewUnsuccessful.reviewUnsuccessful(data);
  res.send(result);
});

app.get("/getTxList", async function (req, res) {
  const result = await getTxList.getTxList(req.query.number);
  if (result.status === "success") {
    res.status(200).send(result);
  } else {
    res.status(404).send("No tx found");
  }
});

app.get("/getUserId", async function (req, res) {
  const result = await getUserId.getUserId(req.query.number);
  if (result.status === "success") {
    res.status(200).send(result);
  } else {
    res.status(404).send("User not found");
  }
});

app.get("/getTxDetails", async function (req, res) {
  var result = await getTxDetails.getTxDetails(req.query.id);
  if (result.status === "success") {
    res.status(200).send(result);
  } else {
    res.status(404).send("No tx found");
  }
});

app.get("/getTxStatus", async function (req, res) {
  var result = await getTxDetails.getTxDetails(req.query.id);
  if (result.status === "success") {
    result = {
      status: "success",
      message: result.data[result.data.length - 1],
    };
  }
  res.send(result);
});

app.get("/verifyPin", async function (req, res) {
  const number = `${req.query.number}TPin`;
  const result = await verifyPin.verifyPin(number, req.query.pin);

  if (result.status === "success") {
    res.status(200).send(result);
  } else {
    res.status(404).send("Pin doesn't match");
  }
});

app.get("/userExist", async function (req, res) {
  const result = await userExist.userExist(req.query.number);

  if (result.status === "success") {
    res.status(200).send(result);
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(3000, function () {
  console.log("listening at port 3000");
});
