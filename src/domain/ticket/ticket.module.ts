import {Module} from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {Ticket} from "./ticket";

@Module({
    imports: [MikroOrmModule.forFeature([Ticket])],
})
export class TicketModule {}