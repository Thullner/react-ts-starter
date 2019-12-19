class RequestError {
    code: number;
    message?: string;
    errors?: {};

    constructor (code:number, message?:string, errors?: {}){
        this.code = code;
        this.message = message;
        this.errors = errors;
    }
}

export default RequestError;
