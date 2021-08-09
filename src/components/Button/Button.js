import React from 'react';
import styles from './Button.module.css';

function Button({text, onClick, value}) {
	const onClickHandler = () => {
		onClick(value);
	}

	return (
		<button className={styles.button} onClick={onClickHandler}>{text}</button>
	);
}

export default Button;