import {Router} from 'express'
import {container} from "tsyringe";
import {TicketFinder} from "../../../domain/application/ticket/TicketFinder";
import {TicketCreateProcessor} from "../../../domain/application/ticket/TicketCreateProcessor";

const ticketController = Router()

// Dependencies
const ticketFinder: TicketFinder = container.resolve(TicketFinder)
// const ticketCreateProcessor: TicketCreateProcessor = container.resolve(TicketCreateProcessor)

ticketController.get("/:ticketId", async (req, res) => {
    const ticket = await ticketFinder.findById(req.params.ticketId)
    res.send(ticket)
})

ticketController.post("/", async (req, res) => {
    // const id = await ticketCreateProcessor.process({
    //     name: req.body.name,
    //     count: req.body.count
    // })
    //
    // const ticket = await ticketFinder.findById(id)
    // res.send(ticket)
})


export {ticketController}