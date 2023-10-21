import { useState, useEffect } from 'react';
import { EMPTY_NOTES_ARRAY } from '../constants/sudokuValues';
import {
	updateNotes,
	anotationInput,
	generarNotas,
	deleteAllNotes,
} from '../utils/sudokuInputOperations';
import {
	validAnotation,
	validateDefinitiveInput,
	hasAnyPuzzleNotes,
	isSamePuzzle,
} from '../utils/sudokuValidations';

import { useErrors } from './useErrors';
import { useHistory } from './useHistory';
import { useSelectedCell } from './useSelectedCell';
import { useAnotationMode } from './useAnotationMode';
import { useIsComplete } from './useIsComplete';

export function useSudoku(
	puzzleArray,
	solutionArray,
	historySudoku,
	sudokuCellErrors,
	totalErrors,
	isComplete
) {
	const [arrSudoku, setArrSudoku] = useState(
		JSON.parse(JSON.stringify(puzzleArray))
	);

	const [
		historyArrSudoku,
		historyArrErrors,
		history,
		setNewHistory,
		undo,
		redo,
		restart,
		index,
	] = useHistory(historySudoku, solutionArray);

	const [
		errorCell,
		errorCount,
		deleteErrorCell,
		addErrorCell,
		addAllErrorCells,
		clearErrorCell,
	] = useErrors(sudokuCellErrors, totalErrors);

	const [
		selectedCell,
		newSelectedCell,
		deselect,
		onSelectedValueChange,
		isDeletableCell,
	] = useSelectedCell();

	const [anotation, switchAnotation] = useAnotationMode();
	const [completePuzzle, checkCompletePuzzle, incompletePuzzle] =
		useIsComplete(isComplete);

	/* Objeto para disminuir la cantidad de exports */
	const handler = {
		switchAnotation: switchAnotation,
		deleteInput: deleteInput,
		createNotes: handleCreateNotes,
		deleteNotes: handleDeleteNotes,
		restart: handleRestart,
		undo: undo,
		redo: redo,
	};

	/* Detectar el cambio del Index porque sino se mostraba el historyArrSudoku incorrecto con cada undo/redo */
	useEffect(() => {
		setArrSudoku(JSON.parse(JSON.stringify(historyArrSudoku)));
		addAllErrorCells(historyArrErrors);

		/* Actualizar el value del selectedCell que cambia en cada undo/redo */
		if (selectedCell) {
			onSelectedValueChange(historyArrSudoku, historyArrErrors);
		}
	}, [index]);

	// ===================== Manejo de inputs =====================

	function manageSudokuInput(value) {
		const { rowIndex, colIndex } = selectedCell;
		let newSudokuArray = [...arrSudoku];

		if (anotation) {
			if (validAnotation(value, rowIndex, colIndex, newSudokuArray)) {
				const anotationsArr = anotationInput(
					value,
					newSudokuArray[rowIndex][colIndex]
				);
				newSudokuArray[rowIndex][colIndex] = anotationsArr;
				setNewHistory(JSON.parse(JSON.stringify(newSudokuArray)));
			}
		} else {
			if (
				validateDefinitiveInput(
					value,
					rowIndex,
					colIndex,
					newSudokuArray,
					solutionArray
				)
			) {
				newSudokuArray[rowIndex][colIndex] = value;
				if (!(errorCell.length === 0)) {
					deleteErrorCell(rowIndex, colIndex);
				}
				newSudokuArray = updateNotes(
					value,
					rowIndex,
					colIndex,
					newSudokuArray
				);
				newSelectedCell(rowIndex, colIndex, value);

				setNewHistory(JSON.parse(JSON.stringify(newSudokuArray)));
				checkCompletePuzzle(newSudokuArray);
			} else {
				newSudokuArray[rowIndex][colIndex] = value;
				newSelectedCell(rowIndex, colIndex);
				if (
					!errorCell.some(
						cell =>
							cell.rowIndex === rowIndex &&
							cell.colIndex === colIndex
					)
				) {
					addErrorCell(rowIndex, colIndex);
					setNewHistory(JSON.parse(JSON.stringify(newSudokuArray)));
				}
			}
		}
		/** Llamamos setNewHistory solo con input que se va a mostrar en el tablero
		 *  Si lo llamacemos en el scope de setArrSudoku
		 *  cada anotación invalida genera una nueva entrada en useHistory
		 */

		setArrSudoku([...newSudokuArray]);
	}

	function deleteInput() {
		const { rowIndex, colIndex } = selectedCell;
		const newSudokuArray = [...arrSudoku];
		newSudokuArray[rowIndex][colIndex] = [...EMPTY_NOTES_ARRAY];

		setArrSudoku(newSudokuArray);

		if (!(errorCell.length === 0)) {
			deleteErrorCell(rowIndex, colIndex);
		}
		setNewHistory(JSON.parse(JSON.stringify(newSudokuArray)));
	}

	// ===================== Handlers para inputs =====================

	function handleCreateNotes() {
		const newSudokuArray = generarNotas(arrSudoku);

		if (
			history.length === 1 ||
			!isSamePuzzle(history[history.length - 1].puzzle, newSudokuArray)
		) {
			setArrSudoku([...newSudokuArray]);
			setNewHistory(JSON.parse(JSON.stringify(newSudokuArray)));
		}
	}

	function handleDeleteNotes() {
		if (hasAnyPuzzleNotes(arrSudoku)) {
			const newSudokuArray = deleteAllNotes(arrSudoku);

			setArrSudoku([...newSudokuArray]);
			setNewHistory(JSON.parse(JSON.stringify(newSudokuArray)));
		}
	}

	function handleRestart() {
		restart();
		deselect();
		clearErrorCell();
		incompletePuzzle();
	}

	return [
		arrSudoku,
		history,
		index,
		selectedCell,
		newSelectedCell,
		deselect,
		isDeletableCell,
		errorCell,
		errorCount,
		completePuzzle,
		anotation,
		manageSudokuInput,
		handler,
	];
}
