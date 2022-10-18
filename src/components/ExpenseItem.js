import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
	const { dispatch } = useContext(AppContext);

	const handleDeleteExpense = () => {
		dispatch({
			type: 'DELETE_EXPENSE',
			payload: props.id,
		});
	};

	return (
		<tr>
		<td>{props.name}</td>
		<td>£{props.cost}</td>
		<td><TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
		</tr>
	);
};

export default ExpenseItem;