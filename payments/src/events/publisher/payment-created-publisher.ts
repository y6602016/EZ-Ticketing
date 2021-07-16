import { Subjects, Publisher, PaymentCreatedEvent } from "@miketickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
