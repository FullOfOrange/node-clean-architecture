import {AsyncLocalStorage} from "node:async_hooks";
import {Knex} from "knex";
import {connection} from "./configuration";
import {TransactionManager} from "../../common/transaction/TransactionManager";

export class KnexTransactionManager implements TransactionManager {

    private asyncLocalStorage: AsyncLocalStorage<Knex.Transaction>;

    constructor() {
        this.asyncLocalStorage = new AsyncLocalStorage();
    }

    async init<T>(callback: (trx: Knex.Transaction) => Promise<T>): Promise<T> {
        return await connection.transaction(async trx => {
            return await this.asyncLocalStorage.run(trx, async () => await callback(trx))
        })
    }

    getTransaction(): Knex.Transaction | undefined {
        return this.asyncLocalStorage.getStore()
    }
}
