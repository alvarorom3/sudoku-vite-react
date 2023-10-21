import { useQuery } from '@tanstack/react-query';
import { useState, useTransition, lazy, Suspense } from 'react';
const Sudoku = lazy(() => import('./components/Sudoku'));
const Menu = lazy(() => import('./components/Menu'));
import { getSudokuState } from './utils/localForageUtils';
import { convertStringToSudokuArray } from './utils/sudokuInputOperations';
import { Container } from '@chakra-ui/react';
import SpinnerIcon from './icons/SpinnerIcon';

import './index.css';

const PUZZLE_URL = import.meta.env.VITE_SUDOKU_URL;

export default function App() {
	const [, startTransition] = useTransition();
	const [currentView, setCurrentView] = useState('menu');
	const [sudokuPuzzle, setSudokuPuzzle] = useState(null);
	const [sudokuDifficulty, setSudokuDifficulty] = useState('');

	const result = useQuery({
		queryKey: ['sudokuPuzzle', sudokuDifficulty],
		queryFn: async () => {
			try {
				const data = await fetch(PUZZLE_URL + '/' + sudokuDifficulty)
					.then(response => response.json())
					.then(json => {
						if (!json.error) {
							return json
						} else {
							return Promise.reject(json)
						}
					});
				const newPuzzle = convertStringToSudokuArray(data.puzzle);
				const newSolution = convertStringToSudokuArray(data.solution);

				const sudokuState = {
					puzzleArray: newPuzzle,
					solutionArray: newSolution,
					historySudoku: [{ puzzle: newPuzzle, errorCell: [{}] }],
					sudokuCellErrors: [],
					totalErrors: 0,
					isComplete: false
				};
				setSudokuPuzzle(sudokuState);
				return data
			} catch (error) {
				return error
			} finally {
				setSudokuDifficulty('');
			}
		},
		enabled: sudokuDifficulty !== '',
		refetch: { cancelRefetch: false }
	})

	function handleStartGame(e) {
		const difficulty = e.target.id;
		setSudokuDifficulty(difficulty);

		startTransition(() => {
			setCurrentView('puzzle');
		});
	};

	function handleBackToMenu() {
		setSudokuPuzzle(null);
		startTransition(() => {
			setCurrentView('menu');
		})
	};

	async function handleContinueGame() {
		const sudoku = await getSudokuState();

		setSudokuPuzzle(sudoku);

		startTransition(() => {
			setCurrentView('puzzle');
		});
	}

	return (
		< Container
			mx='auto'
			height={{ base: '90vh', md: '100%' }}
			display='flex'
			flexDirection='column'
			justifyContent='center'
			pt={{ base: '5%', md: '0' }}
			px='0'
			maxW='1024px'
			className='app'
		>

			{currentView === 'menu' ? (
				<Menu
					onStartGame={handleStartGame}
					onContinueGame={handleContinueGame}

				/>
			) : (
				<Suspense fallback={<SpinnerIcon />}>
					{
						sudokuPuzzle !== null ?
							<Sudoku
								onBackToMenu={handleBackToMenu}
								sudokuState={sudokuPuzzle}
								onStartGame={handleStartGame}
							/> :
							<SpinnerIcon />
					}
				</Suspense>
			)}

		</Container>

	)
}


