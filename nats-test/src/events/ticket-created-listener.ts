import { Message, Stan } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListender extends Listener<TicketCreatedEvent> {
  // in the base Listender class, we only defined subject is the type of Subject
  // but we need to define it's Subjects.TicketCreated or Subjects.OrderUpdated here
  // and we've definded Subjects.TicketCreated = "ticket:created" in subjects.ts
  // so here, suject = "ticket:created"
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data", data);

    msg.ack();
  }
}
