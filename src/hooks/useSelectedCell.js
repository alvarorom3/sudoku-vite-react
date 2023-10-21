import { useState } from 'react';
import { hasNotesCell } from '../utils/sudokuValidations';

export function useSelectedCell() {
	const [selectedCell, setSelectedCell] = useState(null);

	function newSelectedCell(rowIndex, colIndex, value = -1) {
		setSelectedCell({
			value: value,
			editable: value === -1,
			rowIndex: rowIndex,
			colIndex: colIndex,
		});
	}

	function deselect() {
		setSelectedCell(null);
	}

	function onSelectedValueChange(arrSudoku, errorCell) {
		if (
			Array.isArray(
				arrSudoku[selectedCell.rowIndex][selectedCell.colIndex]
			) ||
			(errorCell &&
				errorCell.some(
					cell =>
						cell.rowIndex === selectedCell.rowIndex &&
						cell.colIndex === selectedCell.colIndex
				))
		) {
			newSelectedCell(selectedCell.rowIndex, selectedCell.colIndex);
		} else {
			newSelectedCell(
				selectedCell.rowIndex,
				selectedCell.colIndex,
				arrSudoku[selectedCell.rowIndex][selectedCell.colIndex]
			);
		}
	}

	function isDeletableCell(arrSudoku, errorCell) {
		const isEmptyNoteCell = hasNotesCell(
			arrSudoku[selectedCell.rowIndex][selectedCell.colIndex]
		);

		const isErrorCell = errorCell.some(
			cell =>
				cell.rowIndex === selectedCell.rowIndex &&
				cell.colIndex === selectedCell.colIndex
		);

		return isEmptyNoteCell || isErrorCell;
	}

	return [
		selectedCell,
		newSelectedCell,
		deselect,
		onSelectedValueChange,
		isDeletableCell,
	];
}
