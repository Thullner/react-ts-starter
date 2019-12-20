import React, {FunctionComponent, useContext} from 'react';
import BookDetails from "./BookDetails";
import {BookContext} from "../../contexts/BookContext";
import {Link} from "react-router-dom";
import '../../styles/book-list.scss';


interface OwnProps {
}

type Props = OwnProps;

const BookList: FunctionComponent<Props> = (props) => {

    const {books} = useContext(BookContext);

    return (
        <div>
            <p>
                <Link to={'/example-book-form'}>Add a book</Link>
            </p>
            <div className="book-list">
                {books.length > 0 && books.map(book => <BookDetails key={book.id} book={book}/>)}
                {books.length > 0 && books.map(book => <BookDetails key={book.id} book={book}/>)}
            </div>
        </div>
    );
};

export default BookList;
