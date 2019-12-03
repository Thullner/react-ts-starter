import Model from "./Model";

class User extends Model {
    name: string = '';
    email: string = '';
    password?: string;
    password_confirmation?: string;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(user?: User){
        super(user);
    }
}

export default User;
