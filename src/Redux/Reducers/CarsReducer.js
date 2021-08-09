import { FETCH_CARS_START, FETCH_CARS_FAILURE, FETCH_CARS_SUCCESS, SORT_BY_TYPE, FILTER_BY_INPUT_TEXT } from '../Types/CarsActionTypes';
import { sort } from '../../utils/sort';
import { filter } from '../../utils/filter';

const initialState = {
	isFetching: false,
	error: false,
	cars: [],
	tariffs_list: [],
	sortedCars: [],
	sortType: '',
	sortToCeil: true,
	sortFilterName: '',
};

const CarsReducer = (state = initialState, action) => {
	switch(action.type) {
		case SORT_BY_TYPE: {
			let sortedByType = sort(!action.sortToCeil, state.sortedCars, action.sortType);
			return {
				...state,
				sortType: action.sortType,
				sortToCeil: action.sortToCeil,
				sortedCars: [...sortedByType],
			};
		}

		case FILTER_BY_INPUT_TEXT: {
			let textToMatch = action.text.replace(/\s\s+/g, ' ').trim().toUpperCase();

			if (textToMatch === state.sortFilterName) {
				return {
					...state
				};
			}

			if (textToMatch.includes(state.sortFilterName) && state.sortFilterName !== '') {
				let filtered = filter(state.sortedCars, textToMatch);
				return {
					...state,
					sortedCars: [...filtered],
					sortFilterName: textToMatch,
				};
			}

			let filtered = filter(state.cars, textToMatch)
			return {
				...state,
				sortedCars: [...filtered],
				sortFilterName: textToMatch,
			};
		}

		case FETCH_CARS_START: {
			return {
				...state,
				isFetching: true,
				error: false,
			};
		}

		case FETCH_CARS_FAILURE: {
			return {
				...state,
				isFetching: false,
				error: true,
			};
		}

		case FETCH_CARS_SUCCESS: {
			const cars = action.data.cars;
			return {
				...state,
				cars: [...cars],
				sortedCars: [...cars],
				tariffs_list: action.data.tariffs_list,
				isFetching: false,
				error: false,
			};
		}

		default: {
			return state;
		}
	}
};

export default CarsReducer;