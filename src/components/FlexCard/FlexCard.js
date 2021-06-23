import React from "react";
import "../../static/css/flex_card.css";

const FlexCard = (props) => {
	return <div className={props.size === "large" ? "card-large" : ""}>{props.children}</div>;
}

export default FlexCard;
