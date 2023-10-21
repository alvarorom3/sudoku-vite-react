import {
	getRowValues,
	getColumnValues,
	divideIntoSubgrids,
	findSubgrid,
} from './sudokuInputOperations';

export function validAnotation(value, rowIndex, colIndex, sudokuArray) {
	const row = getRowValues(rowIndex, sudokuArray); //
	if (row.includes(value)) {
		return false;
	}
	const col = getColumnValues(colIndex, sudokuArray); //
	if (col.includes(value)) {
		return false;
	}
	const subgrids = divideIntoSubgrids(sudokuArray); //
	const valueSubgrid = findSubgrid(rowIndex, colIndex, subgrids); //
	for (let i = 0; i < valueSubgrid.length; i++) {
		const subRow = valueSubgrid[i];
		if (subRow.includes(value)) {
			return false;
		}
	}
	return true;
}

export function validateDefinitiveInput(
	value,
	rowIndex,
	colIndex,
	sudokuArray,
	sudokuSolutionArr
) {
	const newSudokuArray = [...sudokuArray];
	newSudokuArray[rowIndex][colIndex] = value;
	const ok =
		newSudokuArray[rowIndex][colIndex] ===
		sudokuSolutionArr[rowIndex][colIndex];
	return ok;
}

export function checkCompletion(sudokuArr) {
	const newSudokuArray = [...sudokuArr];

	for (let i = 0; i < newSudokuArray.length; i++) {
		const row = newSudokuArray[i];
		for (let j = 0; j < row.length; j++) {
			const position = row[j];
			if (Array.isArray(position)) {
				return false;
			}
		}
	}
	return true;
}

export function hasAnyPuzzleNotes(sudokuArr) {
	for (let i = 0; i < sudokuArr.length; i++) {
		for (let j = 0; j < sudokuArr[i].length; j++) {
			const position = sudokuArr[i][j];
			if (typeof position === 'object') {
				for (let k = 0; k < position.length; k++) {
					if (position[k] !== 0) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

export function hasNotesCell(position) {
	if (typeof position === 'object') {
		for (let k = 0; k < position.length; k++) {
			if (position[k] !== 0) {
				return true;
			}
		}
	}
	return false;
}

export function isSamePuzzle(sudokuArr1, sudokuArr2) {
	for (let i = 0; i < sudokuArr1.length; i++) {
		for (let j = 0; j < sudokuArr1[i].length; j++) {
			if (
				typeof sudokuArr1[i][j] === 'object' &&
				typeof sudokuArr2[i][j] === 'object'
			) {
				const position1 = sudokuArr1[i][j];
				const position2 = sudokuArr2[i][j];

				for (let k = 0; k < position1.length; k++) {
					const num = position1[k];
					if (num !== position2[k]) {
						return false;
					}
				}
			} else if (sudokuArr1[i][j] !== sudokuArr2[i][j]) {
				return false;
			}
		}
	}

	return true;
}
