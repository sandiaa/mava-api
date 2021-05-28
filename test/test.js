const axios = require("axios");
const testFunction = () => {
  axios
    .get(
      "http://localhost:3000/getTxDetails?id=87e7bdb41fd14ff6f8c294e720cee20d0a8db058f0edcaa7d5f1a776ed599346"
    )
    .then(
      (response) => {
        console.log(response.data);
      },
      (err) => console.log(err)
    );
  // axios
  //   .put("http://localhost:3000/acceptTx", {
  //     id: "bf0fc50f2e4e392c2cfe79f5ff88e5a121e1c33975e1fb2a61321ab7b4fc9ca3",
  //     sender: "7558153800",
  //     receiver: "7558153800",
  //   })
  //   .then(
  //     (response) => {
  //       console.log(response.data);
  //     },
  //     (err) => console.log(err)
  //   );
  // axios.get("http://localhost:3000/getTxList?number=7558153800").then(
  //   (response) => {
  //     console.log(response.data);
  //   },
  //   (err) => console.log(err)
  // );
  // axios
  //   .put("http://localhost:3000/createNewTx", {
  //     id: "1009",
  //     homeCurrency: "INR",
  //     receiverCurrency: "INR",
  //     createDate: new Date(),
  //     amount: "15000",
  //     expiry: "expiry_date",
  //     description: "desc",
  //     amountInHomeCurrency: "15000",
  //     sender: "7558153800",
  //     receiver: "9585863888",
  //   })
  //   .then(
  //     (response) => {
  //       console.log(response.data.data.inputs);
  //     },
  //     (err) => console.log(err)
  //   );
  // axios
  //   .put("http://localhost:3000/createUser", {
  //     id: "1006",
  //     number: "9585863888",
  //   })
  //   .then(
  //     (response) => {
  //       console.log(response.data);
  //     },
  //     (err) => console.log(err)
  //   );

  // axios.get("http://localhost:3000/getUserId?number=9585863888").then(
  //   (response) => {
  //     console.log(response.data);
  //   },
  //   (err) => console.log(err)
  // );

  // axios
  //   .put("http://localhost:3000/createUser", {
  //     id: "1005",
  //     name: "sandiaa",
  //     number: "7558153800",
  //   })
  //   .then(
  //     (response) => {
  //       console.log(response.data);
  //     },
  //     (err) => console.log(err)
  //   );
};
testFunction();
