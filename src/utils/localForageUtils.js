import localforage from 'localforage';

const STORAGE_KEY = 'sudoku';

export const saveSudokuState = state => {
	localforage.setItem(STORAGE_KEY, state);
};

export const getSudokuState = async () => {
	return localforage.getItem(STORAGE_KEY);
};

export const clearSudokuState = () => {
	localforage.removeItem(STORAGE_KEY);
};

export const hasSavedData = async () => {
	try {
		const data = await localforage.getItem(STORAGE_KEY);
		return !!data; // Return true si la data existe, false si es null o undefined
	} catch (error) {
		return false;
	}
};
