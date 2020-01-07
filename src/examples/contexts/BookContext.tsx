import React, {createContext, FunctionComponent, useEffect, useState} from 'react';
import Book from "../models/Book";
import RestEndpoint from "../../requests/RestEndpoint";
import RequestError from "../../models/RequestError";
import RequestHelper from "../../requests/RequestHelper";

interface OwnProps {
}

interface IBookContext {
    books: Book[],
    addBook: (book: Book) => Promise<void | RequestError>,
    getAllBooks: () => Promise<void>
}

const bookEndpoint = new RestEndpoint('books');

export const BookContext = createContext({} as IBookContext);


type Props = OwnProps;

const BookContextProvider: FunctionComponent<Props> = (props) => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getAllBooks().then();
    }, []);

    const addBook = async (book: Book): Promise<void | RequestError> => {
        try {
            const bookFormData = RequestHelper.convertToFormData(book);

            // @ts-ignore
            const newBook: Book = await bookEndpoint.store(bookFormData);
            setBooks([...books, newBook]);
        } catch (requestError) {
            return requestError;
        }
    };

    const getAllBooks = async (): Promise<void> => {
        // @ts-ignore
        const allBooks: Book[] = await bookEndpoint.all();
        setBooks(allBooks);
    };

    return (
        <BookContext.Provider
            value={{books, addBook, getAllBooks}}>
            {props.children}
        </BookContext.Provider>
    );
};

export default BookContextProvider;
