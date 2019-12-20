import React, {FunctionComponent, useContext} from 'react';
import BookDetails from "./BookDetails";
import {BookContext} from "../../contexts/BookContext";
import {Link} from "react-router-dom";

interface OwnProps {
}

type Props = OwnProps;

const BookList: FunctionComponent<Props> = (props) => {

    const {books} = useContext(BookContext);

    return (
        <div>
            <Link to={'/example-book-form'}>Add a book</Link>
            <div>
                {books.length > 0 && books.map(book => <BookDetails key={book.id} book={book}/>)}
            </div>
        </div>
    );
};

export default BookList;
