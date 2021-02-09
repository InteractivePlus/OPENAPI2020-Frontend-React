import React from "react";
import { Router, Route } from "react-router";
import { createHashHistory } from "history";

import { Home, SignIn, SignUp, ThirdPartyOAuth } from "./page";

import { RouteWithLayout } from "./components";
import { Main as MainLayout } from "./layouts";

import { Dashboard } from "./page";

const appHistory = createHashHistory();

const Routes = () => {
	
	return (
		<Router history={appHistory}>
			<Route exact path="/" component={Home} />
			<Route path="/signin" component={SignIn} />
			<Route path="/signup" component={SignUp} />
			<Route path="/thirdpartyoauth" component={ThirdPartyOAuth} />
			<RouteWithLayout component={Dashboard} exact layout={MainLayout} path="/dashboard" />
		</Router>
	);
};

export default Routes;
