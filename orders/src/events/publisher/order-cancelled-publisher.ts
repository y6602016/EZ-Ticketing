import { Publisher, OrederCancelledEvent, Subjects } from "@miketickets/common";

export class OrderCancelledPublisher extends Publisher<OrederCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
