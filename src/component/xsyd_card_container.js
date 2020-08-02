import React from "react";
import PropTypes from "prop-types";
import Logo from "../static/logo.png";
import "../static/css/xsyd_card_container.css";

import {
	Typography,
} from "@material-ui/core";

function XsydCardContainer(props) {
	const { children, title, subtitle, ...other } = props;

	return (
		<div>
			<div className="xsyd-card-container-tip" {...other}>
				<img className="logo" src={Logo} alt="Logo" />
				<Typography className="xsyd-card-container-title" variant="h1">
					{title}
				</Typography>
				<p className="xsyd-card-container-subtitle">{subtitle}</p>
			</div>
			{children}
		</div>
	);
}

XsydCardContainer.propTypes = {
	children: PropTypes.node,
	title: PropTypes.any.isRequired,
	subtitle: PropTypes.any.isRequired,
};

export default XsydCardContainer;
