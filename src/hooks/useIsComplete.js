import { useState } from 'react';
import { checkCompletion } from '../utils/sudokuValidations';

export function useIsComplete(isComplete) {
	const [completePuzzle, setCompletePuzzle] = useState(isComplete);

	function checkCompletePuzzle(sudokuArray) {
		if (checkCompletion(sudokuArray)) {
			setCompletePuzzle(true);
		}
	}

	function incompletePuzzle() {
		setCompletePuzzle(false);
	}

	return [completePuzzle, checkCompletePuzzle, incompletePuzzle];
}
