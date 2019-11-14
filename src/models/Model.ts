class Model {
    id?: number;
    created_at?: string;
    updated_at?: string;

    constructor(input: Model = {}) {
        Object.assign(this, input);
    }
}

export default Model;
