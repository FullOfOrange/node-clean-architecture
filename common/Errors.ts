export class ExpressError implements Error {
    message: string;
    status: number
    name: string;

    constructor(
        props,
        code = "500.internal_server_error",
        message = "Internal Server Error"
    ) {
        const c = code.split(".");

        this.status = +c[0];
        this.name = c[1];
        this.message = message;
    }
}

