import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListender } from "./events/ticket-created-listener";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

const options = stan.subscriptionOptions().setManualAckMode(true);
stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connections closed");
    process.exit();
  });
  new TicketCreatedListender(stan).listen();
});

// listen for interrupt or terminate, if it happens, close the client
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
