import { useState } from 'react';

export function useErrors(sudokuCellErrors, totalErrors) {
	const [errorCell, setErrorCell] = useState(sudokuCellErrors);
	const [errorCount, setErrorCount] = useState(totalErrors);

	function deleteErrorCell(rowIdx, colIdx) {
		let newErrorsArray = errorCell.filter(
			error => error.rowIndex !== rowIdx || error.colIndex !== colIdx
		);
		setErrorCell(newErrorsArray);
	}

	function addErrorCell(rowIdx, colIdx) {
		let newErrorsArray = [
			...errorCell,
			{ rowIndex: rowIdx, colIndex: colIdx },
		];
		setErrorCell(newErrorsArray);
		setErrorCount(prevErrorCount => prevErrorCount + 1);
	}

	function addAllErrorCells(newErrCells) {
		setErrorCell(newErrCells);
	}

	function clearErrorCell() {
		setErrorCell([]);
	}

	return [
		errorCell,
		errorCount,
		deleteErrorCell,
		addErrorCell,
		addAllErrorCells,
		clearErrorCell,
	];
}
