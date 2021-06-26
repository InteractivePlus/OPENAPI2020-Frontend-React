import React from "react";
import { Router, Route } from "react-router";
import { createBrowserHistory } from "history";

import { Home, SignIn, SignUp, ThirdPartyOAuth, Verify } from "./page";

import { LinearProgress, Collapse } from "@material-ui/core";
import { connect } from 'react-redux';


/*nginx配置中需要加以下内容
    location / {
        try_files $uri $uri/ /index.html; 
    }
*/
const appHistory = createBrowserHistory();

const Routes = (props) => {
	
	return (
		<div>
			{/* 在这里放了一个全局的进度条，可以发dispatch控制 */}
			<div className="progress-placeholder">
				<Collapse in={props.loadingVisible}>
					<LinearProgress />
				</Collapse>
			</div>
		
			<Router history={appHistory}>
				<Route exact path="/" component={Home} />
				<Route path="/signin" component={SignIn} />
				<Route path="/signup" component={SignUp} />
				<Route path="/thirdpartyoauth" component={ThirdPartyOAuth} />
				<Route path="/verify" component={Verify} />
			</Router>
		</div>
	);
};

export default connect(
	(state) => ({
		spinnerVisible: state.getIn(['ui', 'spinnerVisible']),
		loadingVisible: state.getIn(['ui', 'loadingVisible']),
	}),
	(dispatch) => ({
	})
)(Routes);


//export default Routes;
