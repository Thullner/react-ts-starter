class Credentials {
    email: string = '';
    password: string = '';

    constructor(credentials?: Credentials) {
        Object.assign(this, credentials);
    }
}

export default Credentials;
