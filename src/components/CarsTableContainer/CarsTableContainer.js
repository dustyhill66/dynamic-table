import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { TableHeadItem } from '../TableItems/TableHeadItem/TableHeadItem';
import { TableBodyItem } from '../TableItems/TableBodyItem/TableBodyItem';
import { selectCar } from '../../Redux/Actions/SelectCarActions';
import { sortCarsByType } from '../../Redux/Actions/CarsActions';
import { EmptyBody } from '../EmptyBody/EmptyBody';
import { carMarkAndModel, mark, arrowUp, arrowDown } from '../../constants/constants';
import styles from './CarsTableContainer.module.css';


const CarsTableContainer = ({sortedCars, tariffsList, selectCar, sortCars, sortType, sortToCeil}) => {
	const sortSide = useMemo(() => sortToCeil ? arrowUp : arrowDown, [sortToCeil]);

	const tableHead = useMemo(() => {

		const sortCarHandler = (name, sortToCeil) => {
			sortCars(name, sortToCeil);
		};

		return [mark, ...tariffsList].map((name, index) => {
			let thName = '';
			if (name === mark) {
				thName = name === sortType ? `${carMarkAndModel} ${sortSide}` : carMarkAndModel;
			} else {
				thName = name === sortType ? `${name} ${sortSide}` : name;
			}
			return(
				<TableHeadItem
					clickHandler={() => {sortCarHandler(name, !sortToCeil)}}
					text={thName}
					key={index}/>
				);
		});
	}, [tariffsList, sortType, sortToCeil, sortCars, sortSide]);

	const tableBody = useMemo(() => {
		if (!sortedCars.length) {
			return (
				<EmptyBody />
			);
		}
		return sortedCars.map((car, index) => {

			const carTableElements = [];

			const setSelectedCar = (carMarkModel, carYear) => {
				selectCar(carMarkModel, carYear);
			};

			const carMarkModel = `${car.mark} ${car.model}`;
			carTableElements.push(
				<TableBodyItem
					text={carMarkModel}
					key={carMarkModel}/>
			);

			tariffsList.forEach((tariff, index) => {
				const [year, withClick] = car.tariffs[tariff]
					? [car.tariffs[tariff].year, () => {
						setSelectedCar(carMarkModel, year)
					}]
					: ['-', false];
				carTableElements.push(
					<TableBodyItem
						text={year}
						withClick={withClick}
						key={index}
						center={true}/>
				);
			});

			return (
				<tr key={index} className={styles.tableRow}>
					{carTableElements}
				</tr>
			)
		})
	}, [sortedCars, tariffsList, selectCar]);

	return (
		<div className={styles.tableFixed}>
			<table className={styles.table}>
				<thead className={styles.tableHead}>
				<tr className={styles.tableRow}>
					{tableHead}
				</tr>
				</thead>
				<tbody className={styles.tableBody}>
					{tableBody}
				</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = (state) => ({
	sortedCars: state.carsReducer.sortedCars,
	tariffsList: state.carsReducer.tariffs_list,
	sortType: state.carsReducer.sortType,
	sortToCeil: state.carsReducer.sortToCeil,
});

const mapDispatchToProps = (dispatch) => ({
	selectCar: (carMarkModel, carYear) => dispatch(selectCar(carMarkModel, carYear)),
	sortCars: (type, sortToCeil) => dispatch(sortCarsByType(type, sortToCeil)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarsTableContainer);