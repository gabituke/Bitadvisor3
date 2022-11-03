import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';
import axios from 'axios';

const Saloons = () => {
	const [ places, setPlaces ] = useState([]);
	const { setAlert } = useContext(MainContext);

	useEffect(
		() => {
			let url = '/api/places/';

			axios.get(url).then((resp) => setPlaces(resp.data)).catch((error) => {
				console.log(error);
				setAlert({
					message: error.response.data,
					status: 'danger'
				});
			});
		},
		[ setAlert ]
	);

	return (
		<div className="album py-5 bg-light">
			
						<div className="container" >
							<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" >
								
							{places.length > 0 &&
				places.map((article) => {
					return (

								<div className="col" key={article.id}>
									<div className="card shadow-sm">
										<Link to={'/places/single/' + article.id}>
											<img
												src={article.photo}
												alt={article.title}
												className="bd-placeholder-img card-img-top"
												width="100%"
												height="225"
												focusable="false"
											/>
											<p className="img-hover">{article.title}</p>
										</Link>
									</div>
								</div>

);
})}

							</div>
						</div>
				
		</div>
	);
};

export default Saloons;
