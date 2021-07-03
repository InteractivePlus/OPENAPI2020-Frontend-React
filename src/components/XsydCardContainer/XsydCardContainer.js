import React from "react";
import PropTypes from "prop-types";
import Logo from "../../static/logo.png";
import "../../static/css/xsyd_card_container.css";
import InsertLinkIcon from '@material-ui/icons/InsertLink';

import {
	Typography,
} from "@material-ui/core";

function XsydCardContainer(props) {
	const { children, title, subtitle, appImage, ...other } = props;

	return (
		<div className="xsyd-card-container">
			<div className="xsyd-card-container-tip" {...other}>
				<img style={{ verticalAlign: "middle" }} className="logo" src={Logo} alt="Logo" />
				{
					appImage ? (
						<span>
							<InsertLinkIcon fontSize="large" style={{ verticalAlign: "middle", margin: "0 5px" }}></InsertLinkIcon>
							<img style={{ verticalAlign: "middle" }} className="logo" src={appImage} alt="App Icon" />
						</span>
					) : <></>
				}
				<Typography className="xsyd-card-container-title" variant="h1">
					{title}
				</Typography>
				<p className="xsyd-card-container-subtitle">{subtitle}</p>
			</div>
			<div className="xsyd-card-container-content">
				{children}
			</div>
		</div>
	);
}

XsydCardContainer.propTypes = {
	children: PropTypes.node,
	title: PropTypes.any.isRequired,
	subtitle: PropTypes.any.isRequired,
};

export default XsydCardContainer;
