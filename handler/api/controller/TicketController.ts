import {Router} from 'express'
import {container} from "tsyringe";
import {TicketFinder} from "../../../domain/application/ticket/TicketFinder";

// Dependencies
const ticketFinder: TicketFinder = container.resolve(TicketFinder)

const TicketController = Router()
TicketController.get("/", async (req, res) => {
    const ticket = await ticketFinder.findById(1)
    res.send(ticket)
})

export {TicketController}