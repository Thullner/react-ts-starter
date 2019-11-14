import Model from "./Model";

class User extends Model {
    name: string = '';
    email: string = '';

    constructor(user?: User){
        super(user);
    }
}

export default User;
