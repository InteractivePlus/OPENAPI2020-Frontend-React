import React from "react";
import {Link, Button, Grid} from "@material-ui/core";

import "./style/style.css";

const CardBottomBar = ({
	leftText,
	leftTextClickHandler,
	buttonText,
	buttonClickHandler,
	buttonState }) => {
	return (
		<Grid container justify="center" alignItems="center" className="card-bottom-bar">
			<Grid item xs={6}>
				<Button color="primary" onClick={leftTextClickHandler}>
					{leftText}
				</Button>
			</Grid>
			<Grid item xs={6} className="options-right">
				<Button variant="contained" color="primary" onClick={buttonClickHandler} disabled={!buttonState} disableElevation>
					{buttonText}
				</Button>
			</Grid>
		</Grid>
	)
}

export default CardBottomBar;
