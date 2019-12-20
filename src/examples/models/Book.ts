import Model from "../../models/Model";

class Book extends Model {
    name: string = '';
    year: number | '' = '';
    image?: HTMLImageElement;
    imageURL?: string = '';

    constructor(book?: Book){
        super();
        Object.assign(this, book);
    }
}

export default Book;
