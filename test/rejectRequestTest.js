const axios = require("axios");
const testFunction = () => {
  axios
    .put("http://localhost:3000/rejectTx", {
      id: "9146ea3537ce1b2ebbd6d8793a5d1995b422c3035c86e732b03bed919be774fa",
      sender: "9585863888",
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
