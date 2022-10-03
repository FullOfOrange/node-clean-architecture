import {container} from "tsyringe";
import {TypeormTicketRepository} from "./typeorm/TypeormTicketRepository";
import {DataSource} from "typeorm";
import {initializeTransactionalContext} from "typeorm-transactional-cls-hooked";

// Bean configurations
export const dataConfiguration = () => {

    // Support @Transactional() Annotation
    initializeTransactionalContext()

    // Database connection
    const AppDataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "root",
        password: "admin",
        database: "test",
        synchronize: true,
        logging: false,
    })


    container.register("TicketRepository", {useClass: TypeormTicketRepository})
}