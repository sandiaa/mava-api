const axios = require("axios");
const testFunction = () => {
  axios
    .put("http://localhost:3000/createNewTx", {
      id: "1009",
      homeCurrency: "INR",
      receiverCurrency: "INR",
      amount: "15000",
      expiry: "expiry_date",
      description: "desc",
      amountInHomeCurrency: "15000",
      sender: "7558153800",
      receiver: "9585863888",
    })
    .then(
      (response) => {
        console.log(response.data);
      },
      (err) => console.log(err)
    );
};
testFunction();
