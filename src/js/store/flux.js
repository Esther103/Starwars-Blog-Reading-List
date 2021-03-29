const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			API_URL: "https://www.swapi.tech/api",
			favs: [],
			planets: [],
			people: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {},
			loadPlanetsData: () => {
				var requestOptions = {
					method: "GET"
				};
				// Obtener los planetas
				fetch(getStore().API_URL + "/planets", requestOptions)
					.then(res => {
						return res.json();
					})
					.then(data => setStore({ planets: data.results }))
					.catch(err => console.log(err));
			},
			loadPeopleData: () => {
				var requestOptions = {
					method: "GET"
				};
				fetch(getStore().API_URL + "/people", requestOptions)
					.then(res => {
						return res.json();
					})
					.then(data => setStore({ people: data.results }))
					.catch(err => console.log(err));
			},
			loadLocalStorageFavs: () => {
				const localFavs = localStorage.getItem("favoritos_juan_blog");
				if (localStorage.getItem("favoritos_juan_blog")) {
					setStore({
						favs: JSON.parse(localFavs)
					});
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			addFav: fav => {
				//if(getStore().favs.find(x => x.))
				const favCollection = getStore().favs.concat([fav]);
				setStore({ favs: favCollection });
				localStorage.setItem("favoritos_juan_blog", JSON.stringify(favCollection));
			},
			deleteFav: url => {
				setStore({
					favs: getStore().favs.filter(item => {
						return item.url != url;
					})
				});
			}
		}
	};
};

export default getState;
