import React from "react";
import "../../static/css/flex_card.css";

function FlexCard(props) {
	return <div className={props.size === "large" ? "card-large" : ""}>{props.children}</div>;
}

export default FlexCard;
