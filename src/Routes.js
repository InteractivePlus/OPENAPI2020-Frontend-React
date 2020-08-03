import React from 'react';
import { Router, Route } from 'react-router';
import { createHashHistory } from 'history';

import {
    Home,
    SignIn,
    SignUp,
    Dashboard
} from './page';

import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';

const appHistory = createHashHistory();

const Routes = () => {
    return (
        <Router history={appHistory}>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            {/* <Route path="/dashboard" component={Dashboard} /> */}
            <RouteWithLayout
                component={SignIn}
                exact
                layout={MainLayout}
                path="/dashboard"
            />
        </Router>
    );
};

export default Routes;
