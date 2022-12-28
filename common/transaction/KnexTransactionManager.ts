import {container} from "tsyringe";
import {AsyncLocalStorage} from "node:async_hooks";
import {Knex} from "knex";
import {connection} from "../../domain/data/configuration";
import {TransactionManager} from "./TransactionManager";

class KnexTransactionManager implements TransactionManager {

    private asyncLocalStorage: AsyncLocalStorage<Knex.Transaction>;

    constructor() {
        this.asyncLocalStorage = new AsyncLocalStorage();
    }

    async init<T>(callback: () => Promise<T>): Promise<T> {
        return await connection.transaction(async trx => {
            return await this.asyncLocalStorage.run(trx, callback)
        })
    }

    getTransaction(): Knex.Transaction | undefined {
        return this.asyncLocalStorage.getStore()
    }
}

container.registerSingleton(TransactionManager, KnexTransactionManager)