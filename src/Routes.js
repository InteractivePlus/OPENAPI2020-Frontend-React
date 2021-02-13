import React from "react";
import { Router, Route } from "react-router";
import { createHashHistory } from "history";

import { Home, SignIn, SignUp, ThirdPartyOAuth } from "./page";


const appHistory = createHashHistory();

const Routes = (props) => {

	
	return (
		<Router history={appHistory}>
			<Route exact path="/" component={Home} />
			<Route path="/signin" component={SignIn} />
			<Route path="/signup" component={SignUp} />
			<Route path="/thirdpartyoauth" component={ThirdPartyOAuth} />
		</Router>
	);
};

export default Routes;
