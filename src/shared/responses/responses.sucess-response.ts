export class SuccessResponse<T> {
    constructor(public statusCode: number, public message: string, public token?: T) { }
}