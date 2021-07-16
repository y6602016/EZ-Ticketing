import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  function signin(id?: string): string[];
}

jest.mock("../nats-wrapper");

process.env.STRIPE_KEY =
  "sk_test_51JDqLvCT6FKGQGXlrWoObnmgTRSLsDnxJBTRmY5QLV6Wlti8djN72gRPyZecWCUtI8uxcPAchT4H78bsoX9JH73Y00k4U077hA";

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // build a JWT payload, {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object {jwt: MY_JWT}
  const session = { jwt: token };

  // turn that session into json
  const sessionJSON = JSON.stringify(session);

  // take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
