export class ResponseInfo {
	constructor(public statusCode: number, public response: any, ...params: undefined[]) { }
}

export function toObject() {
	return JSON.parse(
		JSON.stringify(
			this,
			(_, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
		),
	);
}