import React, { useState, useEffect, useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const People = props => {
	const { store, actions } = useContext(Context);
	const [info, setInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const params = useParams();
	const URL = store.API_URL + "/people/" + params.theid;

	useEffect(() => {
		getInfo();
	}, [params.theid]);

	const getInfo = () => {
		var requestOptions = {
			method: "GET"
		};

		fetch(URL, requestOptions)
			.then(response => {
				if (response.ok) {
					return response.json();
				}

				throw Error("The status code: " + response.status);
			})
			.then(result => {
				setInfo(result.result);
				setIsLoading(false);
			})
			.catch(error => {
				setIsLoading(false);
				console.log("error", error);
			});
	};

	const showInfo = () => {
		if (isLoading) {
			return <h2>Please wait!</h2>;
		} else {
			return (
				<Fragment>
					<h3>{info.properties.name}</h3>
					<p>{info.description}</p>
				</Fragment>
			);
		}
	};

	const showProperties = () => {
		if (!isLoading) {
			let colList = [];
			for (const key in info.properties) {
				if (info.properties.hasOwnProperty(key)) {
					const element = info.properties[key];
					colList.push(setPropertie(key, element));
				}
			}
			return colList;
		}
		return null;
	};

	const setPropertie = (name, value) => {
		return (
			<div className="col">
				<p className="text-danger">{name}</p>
				<p className="text-danger">{value}</p>
			</div>
		);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<img src="https://1000marcas.net/wp-content/uploads/2019/12/Star-Wars-Logo-600x338.png" />
				</div>
				<div className="col">{showInfo()}</div>
			</div>
			<hr />
			<div className="row">{showProperties()}</div>
		</div>
	);
};

People.propTypes = {
	match: PropTypes.object
};
