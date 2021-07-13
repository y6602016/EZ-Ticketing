import { Publisher, OrederCreatedEvent, Subjects } from "@miketickets/common";

export class OrderCreatedPublisher extends Publisher<OrederCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
