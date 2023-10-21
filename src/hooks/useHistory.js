import { useState } from 'react';
import { getErrorCells } from '../utils/sudokuInputOperations';

export function useHistory(initialState, solutionArr) {
	const [index, setIndex] = useState(initialState.length - 1);
	const [history, setHistory] = useState(initialState);

	function setState(puzzle) {
		const newErrors = getErrorCells(puzzle, solutionArr);

		const newState = { puzzle: puzzle, errorCell: newErrors };

		setHistory(prevState => {
			const newHistory = prevState.slice(0, index + 1);

			newHistory.push(newState);
			return [...newHistory];
		});
		setIndex(prevState => prevState + 1);
	}

	function undo() {
		if (index > 0) {
			setIndex(prevState => prevState - 1);
		}
	}

	function redo() {
		if (index < history.length - 1) {
			setIndex(prevState => prevState + 1);
		}
	}

	function restart() {
		setIndex(0);
		setHistory(prevState => {
			const newHistory = prevState.slice(0, 1);

			return [...newHistory];
		});
	}

	return [
		history[index].puzzle,
		history[index].errorCell,
		history,
		setState,
		undo,
		redo,
		restart,
		index,
	];
}
