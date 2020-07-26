import React from "react";

import { CssBaseline, Container, Grid } from "@material-ui/core";

class Register extends React.Component {
	render() {
		return (
			<>
				<CssBaseline />
				<Container maxWidth="md">
					<Grid container>
						<Grid item xs={12}>
							Logo
						</Grid>
						<Grid item xs={12}>
							Tip
						</Grid>
						<Grid item xs={12}>
							Register Tip
						</Grid>
						<Grid item xs={12}>
							Form
						</Grid>
						<Grid item xs={4}>
							Register Button
						</Grid>
						<Grid item xs={4}>
							Password Reset
						</Grid>
						<Grid item xs={4}>
							Login
						</Grid>
					</Grid>
				</Container>
			</>
		);
	}
}

export default Register;
