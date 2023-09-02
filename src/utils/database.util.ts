import { connect } from "mongoose";

export const connectToMongoDB = async (url: string) => {
  connect(url)
    .then(() => {
      console.log("Connect to database successfully.");
    })
    .catch((error) => {
      console.log(error);
    });
};
