import React from 'react';
import { Button } from 'reactstrap';

const SignInStatus = ({ signOut, setState, route }) => {
    return (
        <div className="ms-auto mt-3">
            <Button color='secondary' onClick={() => {setState(prev => {
                return {
                    ...prev,
                    route: (route === 'home' ? 'history' : 'home')
                }
            })}} >{route === 'home' ? 'History' : 'Back'}</Button>
            &nbsp;
            <Button color='danger' onClick={signOut} >Sign Out</Button>
        </div>
    )
}

export default SignInStatus;
