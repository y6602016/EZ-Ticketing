import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@miketickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
