import {Response, Router} from 'express'
import {container} from "tsyringe";
import {TicketFinder} from "../../../domain/application/ticket/usecase/TicketFinder";
import {TicketCreateProcessor} from "../../../domain/application/ticket/usecase/TicketCreateProcessor";
import {AuthResponseLocals, needAuthMiddleware} from "../middleware/auth";

const ticketController = Router()

// Dependencies
const ticketFinder: TicketFinder = container.resolve(TicketFinder)
const ticketCreateProcessor: TicketCreateProcessor = container.resolve(TicketCreateProcessor)

type TicketFindResponse = {
    ticket: {
        id: string;
        name: string;
        count: number;
        createdAt: Date;
    }
}

/**
 * @api {get} /api/v1/tickets/:ticketId
 * 티켓 정보 확인 API
 */
ticketController.get("/:ticketId", needAuthMiddleware, async (req, res: Response<TicketFindResponse, AuthResponseLocals>) => {
    const ticket = await ticketFinder.findById(req.params.ticketId)

    res.send({
        ticket: {
            id: ticket.requireId(),
            name: ticket.name,
            count: ticket.count,
            createdAt: ticket.createdAt,
        }
    })
})

type TicketCreateRequest = {
    name: string;
    count: number;
}

type TicketCreateResponse = {
    ticket: {
        id: string;
        name: string;
        count: number;
        createdAt: Date;
    }
}

/**
 * @api {post} /api/v1/tickets
 * 티켓 생성 API
 */
ticketController.post("/", needAuthMiddleware, async (req, res: Response<TicketCreateResponse, AuthResponseLocals>) => {
    const {name, count} = req.body as TicketCreateRequest
    const id = await ticketCreateProcessor.process({name, count, requesterId: res.locals.user!!.requireId()})
    const ticket = await ticketFinder.findById(id)

    res.send({
        ticket: {
            id: ticket.requireId(),
            name: ticket.name,
            count: ticket.count,
            createdAt: ticket.createdAt,
        }
    })
})

export {ticketController}