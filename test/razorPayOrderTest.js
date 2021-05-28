const axios = require("axios");
const testFunction = () => {
  axios
    .put("http://localhost:3000/getOrderId", {
      amount: "5000",
      currency: "INR",
      receiptId: "test_receip_3",
    })
    .then(
      (response) => {
        console.log(response.data);
      },
      (err) => console.log(err)
    );
};
testFunction();
