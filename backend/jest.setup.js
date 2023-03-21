const mongoose = require("mongoose");

// Connect to the MongoDB database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Disconnect from the database after all tests have finished running
afterAll(async () => {
  await mongoose.connection.close();
});
