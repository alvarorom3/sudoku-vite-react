import { useEffect, useRef } from 'react';
import { useSudoku } from '../../hooks/useSudoku';
import { nanoid } from 'nanoid';
import SudokuTable from '../SudokuTable';
import { useSaveGame } from '../../hooks/useSaveGame';
import { useModals } from '../../hooks/useModals';

import GhostButton from '../buttons/GhostButton';
import InputButton from '../buttons/InputButton';
import NoteSwitchButton from '../buttons/NoteSwitchButton';

import ConfirmarReinicio from '../modals/ConfirmarReinicio';
import ConfirmarVolver from '../modals/ConfirmarVolver';
import Reglas from '../modals/Reglas';
import PuzzleCompletado from '../modals/PuzzleCompletado';

import { IconButton, Grid, GridItem, Box, Text } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

import BackspaceIcon from '../../icons/BackspaceIcon';
import SaveIcon from '../../icons/SaveIcon';
import RestartIcon from '../../icons/RestartIcon';
import UndoIcon from '../../icons/UndoIcon';
import RedoIcon from '../../icons/RedoIcon';
import BurgerMenuIcon from '../../icons/BurgerMenuIcon';
import NoteIcon from '../../icons/NoteIcon';
import DeleteNotesIcon from '../../icons/DeleteNotesIcon';
import ArrowBackIcon from '../../icons/ArrowBackIcon';
import HelpIcon from '../../icons/HelpIcon';

import './index.css';
import { COPPER, EARTH_YELLOW, ISABELLINE } from '../../constants/styleValues';
import { SUDOKU_INPUTS } from '../../constants/sudokuValues';

export default function Sudoku({ onBackToMenu, sudokuState }) {
    const [isOpenConfimarReinicio, onOpenConfimarReinicio, onCloseConfimarReinicio] = useModals();
    const [isOpenConfimarVolver, onOpenConfimarVolver, onCloseConfimarVolver] = useModals();
    const [isOpenReglas, onOpenReglas, onCloseReglas] = useModals();
    const [isOpenPuzzleCompletado, onOpenPuzzleCompletado, onClosePuzzleCompletado] = useModals();

    const [unsavedChanges, setUnsavedChanges, onSave] = useSaveGame();

    const tableRef = useRef(null);

    const [
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
        handler
    ] = useSudoku(
        sudokuState.puzzleArray,
        sudokuState.solutionArray,
        sudokuState.historySudoku,
        sudokuState.sudokuCellErrors,
        sudokuState.totalErrors,
        sudokuState.isComplete
    )

    // Efecto y useRef para evitar problemas con el focus 
    useEffect(() => {
        if (tableRef.current && selectedCell !== null) {
            tableRef.current.focus();
        }
    });

    useEffect(() => {
        if (history.length !== sudokuState.historySudoku.length) {
            setUnsavedChanges(true);
        }
    }, [history])

    useEffect(() => {
        if (completePuzzle) {
            onOpenPuzzleCompletado();
            onSave(sudokuState.solutionArray, history, errorCell, errorCount, completePuzzle);
        }
    }, [completePuzzle])

    function handleClickInput(value) {
        if (selectedCell && selectedCell.editable) {
            manageSudokuInput(value);
        }
    }

    function handleKeyDownInput(event) {
        const key = event.key
        switch (key) {
            case ' ':
                event.preventDefault();
                handler.switchAnotation();
                break;
            case 'Backspace':
                if (selectedCell && isDeletableCell(arrSudoku, errorCell)) {
                    event.preventDefault();
                    handler.deleteInput();
                }
                break;
            case 'Escape':
                event.preventDefault();
                deselect();
                break;
            default:
                const value = parseInt(key);

                if (!isNaN(value) && value >= 1 && selectedCell.editable && !completePuzzle) {
                    manageSudokuInput(value);
                }
                break;
        }
    }

    function handleBackToMenu() {
        if (unsavedChanges) {
            onOpenConfimarVolver();
        } else {
            onBackToMenu();
        }
    }

    return (
        <div tabIndex='0' onKeyDown={handleKeyDownInput}>
            <Grid templateColumns='repeat(5, 1fr)' px={2} >
                <GridItem colSpan={1} alignSelf='center'>
                    <GhostButton
                        onClickHandler={() => handleBackToMenu()}
                    >
                        <ArrowBackIcon />
                    </GhostButton>
                </GridItem>
                <GridItem colStart={5} colEnd={6} justifySelf='end'>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<BurgerMenuIcon />}
                            size={{ base: 'md', lg: 'lg' }}
                            display={{ base: 'block', md: 'none' }}

                            variant='ghost'
                            _hover={{
                                bg: COPPER
                            }}
                            _active={{
                                bg: ISABELLINE
                            }}
                        />
                        <MenuList bg={ISABELLINE} border='none'>
                            <MenuItem
                                onClick={handler.createNotes}
                                isDisabled={completePuzzle}
                                icon={<NoteIcon />}
                                bg={ISABELLINE}
                                _hover={{ bg: EARTH_YELLOW }}
                            >
                                Generar todas las notas
                            </MenuItem>
                            <MenuItem
                                onClick={handler.deleteNotes}
                                isDisabled={completePuzzle}
                                icon={<DeleteNotesIcon />}
                                bg={ISABELLINE}
                                _hover={{ bg: EARTH_YELLOW }}
                            >
                                Borrar todas las notas
                            </MenuItem>
                            <MenuItem icon={<HelpIcon />} bg={ISABELLINE} _hover={{ bg: EARTH_YELLOW }} onClick={onOpenReglas}>
                                Teclas Rapidas/Controles
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </GridItem>
            </Grid>

            <Box px={2}>
                <Grid templateColumns='repeat(4, 1fr)' my={4} justifyItems='center'>
                    <GhostButton
                        onClickHandler={() => onSave(sudokuState.solutionArray, history, errorCell, errorCount, completePuzzle)}
                        isDisabled={!unsavedChanges}
                    >
                        <SaveIcon />
                        <Text display={{ base: 'none', md: 'inline' }} ml={1}> Guardar</Text>
                    </GhostButton>
                    <GhostButton onClickHandler={onOpenConfimarReinicio} isDisabled={history.length - 1 === 0}>
                        <RestartIcon />
                        <Text display={{ base: 'none', md: 'inline' }} ml={1}> Reiniciar</Text>
                    </GhostButton>
                    <GhostButton onClickHandler={handler.undo} isDisabled={index === 0}>
                        <UndoIcon />
                        <Text display={{ base: 'none', md: 'inline' }} ml={1}> Deshacer</Text>
                    </GhostButton>
                    <GhostButton onClickHandler={handler.redo} isDisabled={index === history.length - 1}>
                        <RedoIcon />
                        <Text display={{ base: 'none', md: 'inline' }} ml={1}> Rehacer</Text>
                    </GhostButton>
                </Grid>

            </Box>

            <Grid className='puzzle' templateColumns={{ base: '1fr', md: 'repeat(5, 1fr)' }}>
                <GridItem colSpan={3} pl={{ base: '0', md: '1em' }}>
                    <SudokuTable
                        sudokuArray={arrSudoku}
                        handleCellClick={newSelectedCell}
                        selectedCell={selectedCell}
                        errorCell={errorCell}
                        tableRef={tableRef}
                    />
                </GridItem>

                <GridItem colSpan={2}>
                    <Grid className='input' mt={4} px={2} templateColumns={{ base: 'repeat(4, 1fr)', md: '1fr' }} gap={2}>
                        <GridItem colSpan={3}>
                            <Grid className='input' templateColumns={{ base: 'repeat(5, 1fr)', md: 'repeat(3, 1fr)' }} gap={2} justifyItems='center'>
                                {SUDOKU_INPUTS.map((value) => (
                                    <InputButton
                                        key={nanoid()}
                                        value={value}
                                        handler={handleClickInput}
                                        anotation={anotation}
                                        isDisabled={completePuzzle}
                                    />
                                ))}
                            </Grid>
                        </GridItem>
                        <GridItem colSpan={1} >
                            <Grid justifyItems='center' templateColumns={{ base: '1fr', md: '2fr 2fr 1fr' }} justifyContent='center'>
                                <GhostButton
                                    onClickHandler={handler.deleteInput}
                                    isDisabled={selectedCell === null || !isDeletableCell(arrSudoku, errorCell)}
                                    colSpan={2}
                                >
                                    <BackspaceIcon />
                                    <Text display={{ base: 'none', md: 'inline' }} ml={1}>Borrar</Text>
                                </GhostButton>
                                <NoteSwitchButton
                                    onClickHandler={handler.switchAnotation}
                                    anotation={anotation}
                                    colSpan={2}

                                />
                                <Menu colSpan={1} >
                                    <MenuButton
                                        as={IconButton}
                                        aria-label='Options'
                                        icon={<BurgerMenuIcon />}
                                        width='100%'
                                        size={{ base: 'md', lg: 'lg' }}
                                        display={{ base: 'none', md: 'block' }}
                                        variant='ghost'
                                        _hover={{
                                            bg: COPPER
                                        }}
                                        _active={{
                                            bg: ISABELLINE
                                        }}
                                    />
                                    <MenuList bg={ISABELLINE} border='none'>
                                        <MenuItem
                                            onClick={handler.createNotes}
                                            isDisabled={completePuzzle}
                                            icon={<NoteIcon />}
                                            bg={ISABELLINE}
                                            _hover={{ bg: EARTH_YELLOW }}
                                        >
                                            Generar todas las notas
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handler.deleteNotes}
                                            isDisabled={completePuzzle}
                                            icon={<DeleteNotesIcon />}
                                            bg={ISABELLINE}
                                            _hover={{ bg: EARTH_YELLOW }}
                                        >
                                            Borrar todas las notas
                                        </MenuItem>
                                        <MenuItem icon={<HelpIcon />} bg={ISABELLINE} _hover={{ bg: EARTH_YELLOW }} onClick={onOpenReglas}>
                                            Teclas Rapidas/Controles
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Grid>
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>

            {/* Modales */}

            <ConfirmarReinicio
                isOpen={isOpenConfimarReinicio}
                onClose={onCloseConfimarReinicio}
                onRestart={handler.restart}
            />

            <ConfirmarVolver
                isOpen={isOpenConfimarVolver}
                onClose={onCloseConfimarVolver}
                onSave={() => onSave(sudokuState.solutionArray, history, errorCell, errorCount, completePuzzle)}
                onBackToMenu={onBackToMenu}
            />

            <Reglas isOpen={isOpenReglas} onClose={onCloseReglas} defaultIndex={1} />

            <PuzzleCompletado
                isOpen={isOpenPuzzleCompletado}
                onClose={onClosePuzzleCompletado}
                errorCount={errorCount}
                onBackToMenu={onBackToMenu}
                onRestart={handler.restart}
            />

        </div>
    )
}
