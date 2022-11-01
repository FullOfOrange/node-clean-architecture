import {Model} from "objection";

export class Tickets extends Model {

    static tableName = 'ticket'
    static idColumn = "id"
    static jsonSchema = {
        type: 'object',
        required: ['name', 'limit'],
        properties: {
            id: {type: 'long'},
            name: {type: 'string'}
        }
    }
}

const test = async () => {

}
