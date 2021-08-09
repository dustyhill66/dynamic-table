import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCars } from '../../Redux/Actions/CarsActions';
import Search from '../Search/Search';
import CarsTableContainer from '../CarsTableContainer/CarsTableContainer';
import { SelectedCar } from '../SelectedCar/SelectedCar';
import { Error } from '../Error/Error';
import { Loader } from '../Loader/Loader';
import styles from './Main.module.css'

function Main({fetchCars, selectedCar, error, isFetching}) {
	useEffect(() => {
		fetchCars();
	}, []);

	if (error) {
		return <Error />
	}

	if (isFetching) {
		return <Loader />
	}

	return (
		<div className={styles.main}>
			<Search />
			<CarsTableContainer />
			<SelectedCar selectedCar={selectedCar} />
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	fetchCars: () => dispatch(fetchCars()),
});

const mapStateToProps = (state) => ({
	selectedCar: state.selectCarReducer.selectedCar,
	error: state.carsReducer.error,
	isFetching: state.carsReducer.isFetching,
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);