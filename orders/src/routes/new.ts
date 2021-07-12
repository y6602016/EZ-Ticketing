import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, OrderStatus } from "@miketickets/common";

import {
  requireAuth,
  validateRequest,
  NotFoundError,
} from "@miketickets/common";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TickedId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    // Make sure that the ticket is not already reserved
    const isResered = await ticket.isReserved();

    if (isResered) {
      throw new BadRequestError("Ticket is already reserved");
    }

    // Caculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build the order ans save it ot the database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });

    await order.save();

    // Publish an event saying that and order was created
    res.send(201).send(order);
  }
);

export { router as newOrderRouter };
