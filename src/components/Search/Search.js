import React, { useState } from 'react';
import { connect } from 'react-redux';
import { filterCars } from '../../Redux/Actions/CarsActions';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Search.module.css'

function Search({filterCarsByText}) {
	const inputPlaceholder = 'Поиск';
	const buttonText = 'Найти';

	const [searchInputValue, setSearchInputValue] = useState('');

	const keypressHandler = (event) => {
			if (event.key === 'Enter') {
				filterCarsByText(searchInputValue);
		}
	};

	const onClickHandler = () => {
			filterCarsByText(searchInputValue);
	}

	return (
		<div className={styles.search__container}>
			<Input 
				onKeyPress={keypressHandler} 
				placeholder={inputPlaceholder} 
				value={searchInputValue} 
				onChangeSetter={setSearchInputValue} 
			/>
			<Button text={buttonText} onClick={onClickHandler} />
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	filterCarsByText: (text) => dispatch(filterCars(text)),
});

export default connect(null, mapDispatchToProps)(Search);