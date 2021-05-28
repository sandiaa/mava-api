const axios = require("axios");
const testFunction = () => {
  axios
    .put("http://localhost:3000/reviewTx", {
      id: "a2bae24fb8d852710a13c5ee6fa2dcee0c65a1ff7c27af30d4a40622a7cf20fd",
      sender: "7558153800",
      receiver: "7558153800",
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
