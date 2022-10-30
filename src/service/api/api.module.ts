import {Module} from '@nestjs/common';
import {MikroOrmModule} from "@mikro-orm/nestjs";

@Module({
    imports: [
        MikroOrmModule.forRoot({
            dbName: 'reservation',
            type: 'mysql',
        }),
    ],
    controllers: [],
    providers: [],
})
export class ApiModule {
}
