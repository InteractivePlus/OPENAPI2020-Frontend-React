import React from "react";
import {Button, Grid} from "@material-ui/core";
import {isEmpty} from "../../utils";
import "./style/style.css";

const CardBottomBar = ({
	leftText,
	leftTextClickHandler,
	centerText,
	centerTextClickHandler,
	buttonText,
	buttonClickHandler,
	buttonState }) => {
	return (
		<Grid container justify="center" alignItems="center" className="card-bottom-bar">
			<Grid item xs={8}>
				{!isEmpty(leftText) && <Button color="primary" className='OptionBtn' onClick={leftTextClickHandler}>
					{leftText}
				</Button>
				}
				{!isEmpty(centerText) && <Button color="primary" className='OptionBtn' onClick={centerTextClickHandler}>
					{centerText}
				</Button>
				}
			</Grid>
			<Grid item xs={4} className="options-right">
				{!isEmpty(buttonText) && <Button variant="contained" color="primary" onClick={buttonClickHandler} disabled={!buttonState} disableElevation>
					{buttonText}
				</Button>
				}
				
			</Grid>
		</Grid>
	)
}

export default CardBottomBar;
