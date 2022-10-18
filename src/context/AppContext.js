import React, { createContext, useReducer } from 'react';

// 5. The reduceer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			const new_expenses = state.expenses.map((currentExp)=> {
				if (currentExp.name === action.payload.name) {
					currentExp.cost =  currentExp.cost + action.payload.cost;
				}
				return currentExp
			})
			action.type = "DONE";
			return {
				...state,
				expenses: [...new_expenses],
			};
			case 'RED_EXPENSE':
				let budget = 0;
				const red_expenses = state.expenses.map((currentExp)=> {
					if (currentExp.name === action.payload.name) {
						currentExp.cost =  currentExp.cost - action.payload.cost;
						budget = state.budget + action.payload.cost
					}
					return currentExp
				})
				action.type = "DONE";
				return {
					...state,
					expenses: [...red_expenses],
				};
			case 'DELETE_EXPENSE':
			action.type = "DONE";
			budget = 0;
			const reduced_expenses = state.expenses.map((currentExp)=> {
				if (currentExp.name === action.payload) {
					budget = state.budget + currentExp.cost
					currentExp.cost =  0;
				}
				return currentExp
			})
			action.type = "DONE";
			return {
				...state,
				expenses: [...reduced_expenses],
				budget
			};
		case 'SET_BUDGET':
			action.type = "DONE";
			return {
				...state,
				budget: action.payload,
			};

		default:
			return state;
	}
};

// 1. Sets the initial state when the app loads
const initialState = {
	budget: 2000,
	expenses: [
		{ id: "Marketing", name: 'Marketing', cost: 50 },
		{ id: "Finance", name: 'Finance', cost: 300 },
		{ id: "Sales", name: 'Sales', cost: 70 },
		{ id: "Human Resource", name: 'Human Resource', cost: 40 },
		{ id: "IT", name: 'IT', cost: 500 },
	],
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
	// 4. Sets up the app state. takes a reducer, and an initial state
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// 5. Returns our context. Pass in the values we want to expose

	return (
		<AppContext.Provider
			value={{
				expenses: state.expenses,
				budget: state.budget,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};