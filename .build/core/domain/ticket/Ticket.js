"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
class Ticket {
    id;
    name;
    limit;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(name, limit, createdAt, updatedAt) {
        this.id = null;
        this.name = name;
        this.limit = limit;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = null;
    }
}
exports.Ticket = Ticket;
//# sourceMappingURL=Ticket.js.map