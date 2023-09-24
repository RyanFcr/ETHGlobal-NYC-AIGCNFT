import axios from "axios";

export const getDonateNum = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://www.aigcmaker.xyz/api/getTotalDonateNum")
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const postDonateNum = (data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post("https://www.aigcmaker.xyz/api/postDonateNum", data)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
