import {Router} from 'express'
import {container} from "tsyringe";
import {TicketFinder} from "../../../domain/application/ticket/TicketFinder";

const ticketController = Router()

// Dependencies
const ticketFinder: TicketFinder = container.resolve(TicketFinder)

ticketController.get("/", async (req, res) => {
    const ticket = await ticketFinder.findById("")
    res.send(ticket)
})

export {ticketController}