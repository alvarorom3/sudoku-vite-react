import { SUDOKU_INPUTS, EMPTY_NOTES_ARRAY } from '../constants/sudokuValues';
import { validAnotation } from './sudokuValidations';

export function convertStringToSudokuArray(inputString) {
	const sudokuArray = [];
	let rowIndex = 0;

	for (let i = 0; i < inputString.length; i++) {
		const char = inputString.charAt(i);
		const value =
			char === '.' ? [...EMPTY_NOTES_ARRAY] : parseInt(char, 10);

		if (!sudokuArray[rowIndex]) {
			sudokuArray[rowIndex] = [];
		}

		sudokuArray[rowIndex].push(value);

		if (sudokuArray[rowIndex].length === 9) {
			rowIndex++;
		}
	}

	return sudokuArray;
}

/* ================================================
    -Actualizar notas
    Solo cuando se introduce un input definitivo correcto
 ================================================ */

export function updateNotes(value, rowIndex, colIndex, sudokuArray) {
	const noteIndex = value - 1;
	const newSudokuArray = [...sudokuArray];

	// ==== Modificar fila ====
	const row = getRowValues(rowIndex, newSudokuArray);
	const newRowValues = updateNotesCell(row, noteIndex, value);
	newSudokuArray[rowIndex] = newRowValues;

	// ==== Modificar columna ====
	const col = getColumnValues(colIndex, sudokuArray);
	const newColValues = updateNotesCell(col, noteIndex, value);

	for (let rowIndex = 0; rowIndex < newSudokuArray.length; rowIndex++) {
		newSudokuArray[rowIndex][colIndex] = newColValues[rowIndex];
	}

	// ==== Modificar Subgrid ====
	const sudokuSubgrids = divideIntoSubgrids(newSudokuArray);
	const subgrid = findSubgrid(rowIndex, colIndex, sudokuSubgrids);
	const subGridIndex = findSubgridStartingIndex(rowIndex, colIndex);
	const { subgridRowIndex, subgridColIndex } = subGridIndex;

	/* Introducir los cambios en cada subrow */
	for (let i = 0; i < subgrid.length; i++) {
		const newSubRow = updateNotesCell(subgrid[i], noteIndex, value);
		subgrid[i] = newSubRow;
	}

	/* Introducir los cambios en el puzzle */
	for (let i = 0; i < subgrid.length; i++) {
		const row = subgrid[i];
		const gRowIndex = subgridRowIndex + i;

		for (let j = 0; j < row.length; j++) {
			const cell = row[j];
			const gColIndex = subgridColIndex + j;

			newSudokuArray[gRowIndex][gColIndex] = cell;
		}
	}

	return newSudokuArray;
}

export function generarNotas(sudokuArr) {
	const newSudokuArray = [...sudokuArr];

	for (let i = 0; i < newSudokuArray.length; i++) {
		const row = newSudokuArray[i];
		for (let j = 0; j < row.length; j++) {
			const position = row[j];
			if (!(position > 0)) {
				let newNotesArr = [...EMPTY_NOTES_ARRAY];
				for (let k = 0; k < SUDOKU_INPUTS.length; k++) {
					if (
						validAnotation(SUDOKU_INPUTS[k], i, j, newSudokuArray)
					) {
						newSudokuArray[i][j] = anotationInput(
							SUDOKU_INPUTS[k],
							newNotesArr
						);
					}
				}
			}
		}
	}

	return newSudokuArray;
}

export function deleteAllNotes(sudokuArr) {
	const newSudokuArray = [...sudokuArr];

	for (let i = 0; i < newSudokuArray.length; i++) {
		const row = newSudokuArray[i];
		for (let j = 0; j < row.length; j++) {
			const position = row[j];
			if (Array.isArray(position)) {
				newSudokuArray[i][j] = [...EMPTY_NOTES_ARRAY];
			}
		}
	}

	return newSudokuArray;
}

export function anotationInput(value, array) {
	const index = value - 1;
	if (Array.isArray(array)) {
		if (array.includes(value)) {
			array[index] = 0;
		} else {
			array[index] = value;
		}
		return array;
	} else {
		const arrNotes = [...EMPTY_NOTES_ARRAY];
		arrNotes[index] = value;
		return arrNotes;
	}
}

export function findSubgridStartingIndex(rowIndex, colIndex) {
	const subgridRowIndex = Math.floor(rowIndex / 3) * 3;
	const subgridColIndex = Math.floor(colIndex / 3) * 3;

	return {
		subgridRowIndex: subgridRowIndex,
		subgridColIndex: subgridColIndex,
	};
}

export function getErrorCells(sudokuArr, solucionArr) {
	const newErrors = [];

	for (let i = 0; i < sudokuArr.length; i++) {
		for (let j = 0; j < sudokuArr[i].length; j++) {
			const cell = sudokuArr[i][j];

			if (typeof cell === 'object') {
				continue;
			}
			if (cell !== solucionArr[i][j]) {
				newErrors.push({ rowIndex: i, colIndex: j });
			}
		}
	}
	return newErrors;
}

/* ================================================
                    Funciones Aux 
 ================================================ */

function updateNotesCell(arrSudokuValues, noteIndex, value) {
	return arrSudokuValues.map(position => {
		if (Array.isArray(position) && position.includes(value)) {
			const newNotesArray = [...position];
			newNotesArray[noteIndex] = 0;

			return newNotesArray;
		} else {
			return position;
		}
	});
}

export function getRowValues(rowIndex, sudokuArray) {
	const rowValues = [];
	for (
		let colIndex = 0;
		colIndex < sudokuArray[rowIndex].length;
		colIndex++
	) {
		const value = sudokuArray[rowIndex][colIndex];

		rowValues.push(value);
	}
	return rowValues;
}

export function getColumnValues(colIndex, sudokuArray) {
	const columnValues = [];
	for (let rowIndex = 0; rowIndex < sudokuArray.length; rowIndex++) {
		const value = sudokuArray[rowIndex][colIndex];
		columnValues.push(value);
	}
	return columnValues;
}

export function divideIntoSubgrids(sudokuArray) {
	const subgrids = [];

	for (let i = 0; i < 9; i += 3) {
		for (let j = 0; j < 9; j += 3) {
			const subgrid = [];

			for (let row = i; row < i + 3; row++) {
				const subgridRow = [];
				for (let col = j; col < j + 3; col++) {
					subgridRow.push(sudokuArray[row][col]);
				}
				subgrid.push(subgridRow);
			}

			subgrids.push(subgrid);
		}
	}

	return subgrids;
}

export function findSubgrid(rowIndex, colIndex, subgrids) {
	// Calcular el indice del subgrid basadp en la posicion
	const subgridRow = Math.floor(rowIndex / 3);
	const subgridCol = Math.floor(colIndex / 3);

	// Calcular el indice del subgrid en base al array de subgrids dado
	const subgridIndex = subgridRow * 3 + subgridCol;

	// Traer el subgrid de los subgrids dados
	const subgrid = subgrids[subgridIndex];

	return subgrid;
}
