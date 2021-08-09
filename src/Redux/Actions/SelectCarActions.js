import { SELECT_CAR } from '../Types/SelectCarActionTypes';

export const selectCar = (carMarkModel, carYear) => ({
	type: SELECT_CAR,
	carMarkModel,
	carYear,
});