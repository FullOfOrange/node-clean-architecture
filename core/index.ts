import 'reflect-metadata'

import './data'

import {TicketService} from "./application/TicketService"
import {container} from "tsyringe";

const configurations = () => {
    container.register("TicketFinder", {useClass: TicketService});
}

configurations()