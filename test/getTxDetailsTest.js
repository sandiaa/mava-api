const axios = require("axios");
const testFunction = () => {
  const id = "e47c1bf5ca0c65d0f89eab7581124270247bbd97c77bd42ceafb0b6915b341b4";
  axios.get(`http://localhost:3000/getTxDetails?id=${id}`).then(
    (response) => {
      response.data.data.forEach((element) => {
        console.log(element);
      });
    },
    (err) => console.log(err)
  );
};
testFunction();
