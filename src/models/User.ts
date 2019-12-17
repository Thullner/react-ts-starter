import Model from "./Model";

class User extends Model {
    name: string = '';
    email: string = '';
    password?: string = '';
    password_confirmation?: string = '';

    constructor(user?: User){
        super();
        Object.assign(this, user);
    }
}

export default User;
