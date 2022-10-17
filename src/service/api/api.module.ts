import {Module} from '@nestjs/common';
import {MikroOrmModule} from "@mikro-orm/nestjs";

@Module({
    imports: [
        MikroOrmModule.forRoot({
            entities: ['./dist/entities'],
            entitiesTs: ['./src/entities'],
            dbName: 'my-db-name.sqlite3',
            type: 'mysql',
        }),
    ],
    controllers: [],
    providers: [],
})
export class ApiModule {
}
