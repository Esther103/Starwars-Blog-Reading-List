import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import PropTypes from "prop-types";

import { Context } from "../store/appContext";

const List = props => {
	return (
		<div className="container mb-5">
			<h3 className="text-left text-danger">{props.title}</h3>
			<div className="scrolling-wrapper-flexbox">
				{props.list.map((item, index) => {
					return <Card title={item.name} route={props.route} id={item.uid} key={index} />;
				})}
			</div>
		</div>
	);
};

List.propTypes = {
	title: PropTypes.string,
	route: PropTypes.string,
	list: PropTypes.array
};

export default List;
