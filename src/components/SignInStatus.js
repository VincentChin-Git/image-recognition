import React from 'react';
import { Button } from 'reactstrap';

const SignInStatus = ({ isSignedIn, clickButton }) => {
    return (
        <div className="ms-auto mt-3">
            {/* <Button color={isSignedIn ? 'danger' : 'primary'} onClick={clickButton} >
                {isSignedIn ? 'Sign Out' : 'Sign In'}
            </Button> */}
            <Button color='danger' onClick={clickButton} >
                {'Sign Out'}
            </Button>
        </div>
    )
}

export default SignInStatus;
