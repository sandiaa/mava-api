const axios = require("axios");
const testFunction = () => {
  axios
    .put("http://localhost:3000/createUser", {
      id: "1008",
      number: "7558153800",
    })
    .then(
      (response) => {
        console.log(response.data);
      },
      (err) => console.log(err)
    );
};
testFunction();
