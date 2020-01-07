import React, {ChangeEvent, FormEvent, FunctionComponent, useContext, useState} from 'react';
import RequestError from "../../../models/RequestError";
import Book from "../../models/Book";
import ValidationError from "../../../components/utils/ValidationError";
import ImageUpload from "../../../components/utils/ImageUpload";
import {BookContext} from "../../contexts/BookContext";
import { RouteComponentProps } from 'react-router-dom';

interface OwnProps {
}

type Props = OwnProps & RouteComponentProps;

const BookForm: FunctionComponent<Props> = (props) => {
    const [book, setBook] = useState<Book>(new Book());
    const [image, setImage] = useState<HTMLImageElement>();
    const [requestError, setRequestError] = useState<RequestError>();
    const {addBook} = useContext(BookContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBook({...book, [e.target.id]: e.target.value})
    };

    const handleImageUpload = (image: HTMLImageElement) => {
        setBook(new Book({...book, image}));
        setImage(image);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const requestError = await addBook(book);

        if (requestError) {
            setRequestError(requestError);
            return;
        }

        props.history.push({pathname: "/example-list", state: {message: `'${book.name}' was added`}});
    };

    return (
        <form onSubmit={handleSubmit}>
            {requestError &&
            <ValidationError requestError={requestError}/>}
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={book.name}
                       onChange={handleChange}
                       required/>
            </div>
            <div className="form-group">
                <label htmlFor="year">Year of publication</label>
                <input id="year" type="text" value={book.year}
                       onChange={handleChange}
                       required/>
            </div>
            <div className="form-group">
                <ImageUpload setImage={handleImageUpload}/>
            </div>
            <button>Submit</button>
        </form>
    );
};

export default BookForm;
