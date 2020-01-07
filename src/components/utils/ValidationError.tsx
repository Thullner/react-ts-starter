import React, {FunctionComponent} from 'react';
import RequestError from "../../models/RequestError";


interface OwnProps {
    requestError: RequestError
}

type Props = OwnProps;

const ValidationError: FunctionComponent<Props> = (props) => {

    return (
        <ul className="message-box errors">
            {
                props.requestError.errors ?
                    Object.values(props.requestError.errors).map((error: any) => <li key={error}>{error}</li>)
                    :
                <li>{props.requestError.message}</li>
            }
        </ul>
    );
};

export default ValidationError;
