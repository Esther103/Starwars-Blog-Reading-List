import React, { useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import Card from "../component/Card";
import List from "../component/List";

import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<List title="Characters" list={store.people} route="people" />
			<List title="Planets" list={store.planets} route="planets" />
		</div>
	);
};
