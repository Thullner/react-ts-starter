import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import BookDetails from "./BookDetails";
import {BookContext} from "../../contexts/BookContext";
import {Link, RouteComponentProps} from "react-router-dom";
import '../../styles/book-list.scss';


interface OwnProps {
}

type Props = OwnProps & RouteComponentProps;

const BookList: FunctionComponent<Props> = (props) => {

    const {books} = useContext(BookContext);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (props.history.location.state) {
            setSuccessMessage(props.history.location.state.message);
        }
        props.history.replace({
            ...props.location,
            state: undefined
        });
    }, []);

    return (
        <div>
            <p>
                <Link to={'/example-form'}>Add a book</Link>
            </p>
            {successMessage && <ul className="message-box success"><li>{successMessage}</li></ul>}
            <div className="book-list">
                {books.length > 0 && books.map(book => <BookDetails key={book.id} book={book}/>)}
            </div>
        </div>
    );
};

export default BookList;
