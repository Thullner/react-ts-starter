import React, {FunctionComponent} from 'react';
import Book from "../../models/Book";

interface OwnProps {
    book: Book
}

type Props = OwnProps;

const BookDetails: FunctionComponent<Props> = (props) => {
    const {book} = props;

    return (
        <div className="book-details" key={book.id}>
            <img src={book.imageURL} alt={book.name}/>
            <p> {book.name} - {book.year} </p>
        </div>
    );
};

export default BookDetails;
