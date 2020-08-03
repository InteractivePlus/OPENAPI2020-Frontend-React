import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
	render() {
		return (
			<div>
				<Link to="/signin">Sign In</Link> | <Link to="/signup">Sign Up</Link>
				| <Link to="/dashboard">Dashboard</Link>
			</div>
		);
	}
}

export default Home;
