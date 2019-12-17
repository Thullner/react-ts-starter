import React, { FunctionComponent } from 'react';


interface OwnProps {message: string}
type Props = OwnProps;

const ValidationError: FunctionComponent<Props> = (props) => {

  return (
    <div>
        <li>{props.message}</li>
    </div>
  );
};

export default ValidationError;
