import { useState } from 'react';
import { saveSudokuState } from '../utils/localForageUtils';

export function useSaveGame() {
	const [unsavedChanges, setUnsavedChanges] = useState(false);

	function onSave(
		arrSolucion,
		history,
		errorCell,
		errorCount,
		completePuzzle
	) {
		const sudokuState = {
			puzzleArray: JSON.parse(
				JSON.stringify(history[history.length - 1].puzzle)
			),
			solutionArray: arrSolucion,
			historySudoku: history,
			sudokuCellErrors: errorCell,
			totalErrors: errorCount,
			isComplete: completePuzzle,
		};

		saveSudokuState(sudokuState);
		setUnsavedChanges(false);
	}

	return [unsavedChanges, setUnsavedChanges, onSave];
}
