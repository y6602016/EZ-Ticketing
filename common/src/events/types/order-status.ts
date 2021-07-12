export enum OrderStatus {
  // the order is created, but the ticket has not been reserved yet
  Created = "created",

  // the ticket is reserved in order
  // or the user cancelled the order
  // or the order expires before the payment
  Cancelled = "cancelled",

  // the order reserved the ticket
  AwaitingPayment = "awaiting:payment",

  // the order has reserved the ticket ans the user has provided payment
  Complete = "complete",
}
