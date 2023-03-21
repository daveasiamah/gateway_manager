const { default: mongoose } = require("mongoose");
const request = require("supertest");
const { createGateway } = require("../controllers/gateway_controller");
const { Gateway } = require("../models/Gateway");
const app = require("../server");

describe("createGateway", () => {
  jest.setTimeout(60000);
  afterEach(async () => {
    await Gateway.deleteMany({});
  });

  it("should create a new gateway with valid input", async () => {
    const input = {
      serialNumber: "123456789",
      name: "Test Gateway",
      ipAddress: "192.168.0.1",
      devices: [],
    };

    const response = await request(app)
      .post("/api/gateways")
      .send(input)
      .set("Accept", "application/json")
      .expect(201);

    const gateway = await Gateway.findOne({ serialNumber: input.serialNumber });

    expect(response.body).toHaveProperty("ipAddress", gateway.ipAddress);
  });

  it("should return a 400 error with invalid input", async () => {
    const input = {
      serialNumber: "123456789",
      name: "Test Gateway",
      ipAddress: "invalid ip address",
      devices: [],
    };

    const response = await request(app)
      .post("/api/gateways")
      .send(input)
      .set("Accept", "application/json")
      .expect(400);

    expect(response.body).toBe(
      '"ipAddress" must be a valid ip address with a optional CIDR'
    );
  });

  it("should return a 400 error if devices array has more than 10 items", async () => {
    const input = {
      serialNumber: "123456789",
      name: "Test Gateway",
      ipAddress: "192.168.0.1",
      devices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    };

    const response = await request(app)
      .post("/api/gateways")
      .send(input)
      .set("Accept", "application/json")
      .expect(400);

    expect(response.body).toHaveReturnedWith({
      message: "No more than 10 devices are allowed for a gateway",
    });
  });

  it("should return a 500 error if there is an error in the database", async () => {
    jest.spyOn(Gateway, "create").mockImplementationOnce(() => {
      throw new Error("Failed to create gateway");
    });

    const input = {
      serialNumber: "123456789",
      name: "Test Gateway",
      ipAddress: "192.168.0.1",
      devices: [],
    };

    const response = await request(app)
      .post("/api/gateways")
      .send(input)
      .set("Accept", "application/json")
      .expect(500);

    expect(response.body).toHaveReturnedWith();
  });
});
