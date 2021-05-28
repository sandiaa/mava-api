const axios = require("axios");
const testFunction = () => {
  axios
    .put("http://localhost:3000/refundAmtTx", {
      id: "7eaf7639164181faf24ddb1db9f24fddd4438342c65a1719da3a8d203af7d6b9",
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
