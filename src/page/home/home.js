import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
	render() {
		return (
			<div>
				<Link to="/signin">Sign In</Link> | 
				<Link to="/signup">Sign Up</Link> |
				<Link to="/verify">Verify</Link> | 
				<Link target="_blank" to="/thirdpartyoauth">OAuth</Link>|
				<Link to="/resetpwd">Resetpwd</Link>| 
			</div>
		);
	}
}

export default Home;
