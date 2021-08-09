import React from 'react';
import styles from './TableBodyItem.module.css';

export const TableBodyItem = React.memo(({withClick, text, center}) => {
	if (withClick) {
		return (
			<td onClick={withClick}
					className={`${styles.tableBodyItem} ${center ? styles.centerItem : ''} ${styles.withClick}`}>
				{text}
			</td>
		);
	}

	return (
		<td className={`${styles.tableBodyItem} ${center ? styles.centerItem : ''}`}>
			{text}
		</td>
	);
});