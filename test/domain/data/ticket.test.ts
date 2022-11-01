import {describe, expect, test} from '@jest/globals';
import {Tickets} from "../../../domain/data/Tickets";



describe('ticket module', () => {
    test('test insert module', async () => {
        const ticket = await Tickets.query().insertAndFetch({
            name: 'test',
            limit: 10
        })

        ticket.$form
    });
});