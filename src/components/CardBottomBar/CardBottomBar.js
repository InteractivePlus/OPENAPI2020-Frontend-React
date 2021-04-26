import React from "react";
import {Link, Button, Grid} from "@material-ui/core";


const CardBottomBar = ({ leftText,
	leftTextClickHandler,
	buttonText,
	buttonClickHandler,
	buttonState }) => {
	return (
		<Grid container justify="center" alignItems="center">
			<Grid item xs={6}>
				<Link href="" onClick={leftTextClickHandler}>
					{leftText}
				</Link>
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
