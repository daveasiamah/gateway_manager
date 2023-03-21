const mongoose = require("mongoose");
const { Gateway } = require("./models/Gateway");

// Clean up any remaining connections and models
module.exports = async () => {
  await Promise.all(
    Object.keys(mongoose.connection.collections).map((collection) =>
      Gateway.deleteMany({})
    )
  );
  await mongoose.disconnect();
};
