import React from 'react';
import { Button } from 'reactstrap';

const SignInStatus = ({ signOut }) => {
    return (
        <div className="ms-auto mt-3">
            <Button color='danger' onClick={signOut} >
                {'Sign Out'}
            </Button>
        </div>
    )
}

export default SignInStatus;
