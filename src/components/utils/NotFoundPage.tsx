import React, { FunctionComponent } from 'react';
import {Link} from "react-router-dom";

interface OwnProps {}

type Props = OwnProps;

const NotFoundPage: FunctionComponent<Props> = (props) => {

  return (
    <div>
        <h2>
            404 - Page not found
        </h2>
        <p>
            <Link to="/">Go to Home</Link>
        </p>
    </div>
  );
};

export default NotFoundPage;
