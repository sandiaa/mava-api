const axios = require("axios");
const testFunction = () => {
  axios
    .put("http://localhost:3000/deliverTx", {
      id: "3f3ab42ee7c659e77044517a45509e047e9106963eb81011e46b599a964ad59f",
      sender: "7558153800",
      assetId:
        "e47c1bf5ca0c65d0f89eab7581124270247bbd97c77bd42ceafb0b6915b341b4",
    })
    .then(
      (response) => {
        console.log(response.data);
      },
      (err) => console.log(err)
    );
};
testFunction();
