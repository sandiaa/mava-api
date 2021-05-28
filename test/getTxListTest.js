const axios = require("axios");
const testFunction = () => {
  axios.get("http://localhost:3000/getTxList?number=7558153800").then(
    (response) => {
      console.log(response.data);
    },
    (err) => console.log(err)
  );
};
testFunction();
