import CityMobilCarsAPI from '../../API/CarsApi';
import { FETCH_CARS_START, FETCH_CARS_FAILURE, FETCH_CARS_SUCCESS, SORT_BY_TYPE, FILTER_BY_INPUT_TEXT } from '../Types/CarsActionTypes';
import { remakeCarsResponse } from '../../utils/remakeCarsResponse';

export const fetchCarsStart = () => ({
	type: FETCH_CARS_START,
});

export const fetchCarsSuccess = (data) => ({
	type: FETCH_CARS_SUCCESS,
	data,
});

export const fetchCarsFailure = () => ({
	type: FETCH_CARS_FAILURE,
});

export const sortCarsByType = (sortType, sortToCeil) => ({
	type: SORT_BY_TYPE,
	sortType,
	sortToCeil,
});

export function fetchCars () {
	return (dispatch) => {
		dispatch(fetchCarsStart());
		return new CityMobilCarsAPI()
			.getCars()
			.then((response) => {
				dispatch(fetchCarsSuccess(remakeCarsResponse(response.data)))
			})
			.catch((error) => {
				console.error(error)
				dispatch(fetchCarsFailure())
			});
	};
}

export const filterCars = (text) => ({
	type: FILTER_BY_INPUT_TEXT,
	text,
});