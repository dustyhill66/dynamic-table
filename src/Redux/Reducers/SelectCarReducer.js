import { SELECT_CAR } from '../Types/SelectCarActionTypes';

const initialState = {
	selectedCar: '',
};

const SelectCarReducer = (state = initialState, action) => {
	switch(action.type) {
		case SELECT_CAR: {
			const selectedCar = `${action.carMarkModel} ${action.carYear}`

			return {
				...state,
				selectedCar
			};
		}
		default: {
			return state;
		}
	}
};

export default SelectCarReducer;