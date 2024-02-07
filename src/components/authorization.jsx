import React from 'react';
import {_getToken} from "@/utils/token";
import {Navigate} from "react-router-dom";

function Authorization(props) {
    const {children} = props
    if (_getToken()) {
        return (<>
            {children}
        </>)
    }
    return (
        <Navigate to='/login' replace></Navigate>
    )


}

export default Authorization;