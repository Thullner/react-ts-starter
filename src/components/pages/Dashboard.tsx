import React, {FunctionComponent} from 'react';

interface OwnProps {
}

type Props = OwnProps;

const Dashboard: FunctionComponent<Props> = (props) => {


    return (
        <div>
            <h2>Dashboard</h2>
            <p>You're logged in!</p>
        </div>
    );
};

export default Dashboard;
