import { Message } from "node-nats-streaming";

import { Listener, OrederCreatedEvent, Subjects } from "@miketickets/common";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queue/expiration-queue";

export class OrderCreatedListener extends Listener<OrederCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrederCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("wait for:", delay);

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay: delay,
      }
    );

    msg.ack();
  }
}
