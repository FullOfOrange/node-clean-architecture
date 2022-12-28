import {Knex} from "knex";

export interface TransactionManager {

    init<T>(callback: (trx: Transaction) => Promise<T>): Promise<T>

    getTransaction(): Transaction | undefined
}

export const TransactionManager = Symbol("TransactionManager");
export type Transaction = Knex.Transaction
