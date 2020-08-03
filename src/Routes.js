import React from 'react';
import {Router,Route} from 'react-router';
import { createHashHistory } from 'history';

import {
    Home,
    SignIn,
    SignUp,
    Dashboard
} from './page';

 
const appHistory = createHashHistory();

const Routes = () => {
    return (
        <Router history={appHistory}>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
        </Router>
    );
};

export default Routes;
