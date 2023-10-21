import { useState, useEffect } from 'react';

import MainMenuButton from '../buttons/MainMenuButton';
import Dificultad from '../modals/Dificultad';
import Reglas from '../modals/Reglas';
import Repo from '../modals/Repo';
import './index.css';

import { clearSudokuState, hasSavedData } from '../../utils/localForageUtils';
import { Box, Stack, Grid, Heading } from '@chakra-ui/react';
import { useModals } from '../../hooks/useModals';
import DeleteIcon from '../../icons/DeleteIcon';
import { ENGINEERING_ORANGE, MARTIAN_MONO, SIENNA } from '../../constants/styleValues';


export default function Menu({ onStartGame, onContinueGame }) {
    const [hasData, setHasData] = useState(false);
    const [isOpenDificultad, onOpenDificultad, onCloseDificultad] = useModals();
    const [isOpenReglas, onOpenReglas, onCloseReglas] = useModals();
    const [isOpenRepo, onOpenRepo, onCloseRepo] = useModals();

    useEffect(() => {
        hasSavedData().then((result) => {
            setHasData(result);
        })
    }, [])

    function onClearSudokuState() {
        clearSudokuState();
        setHasData(false);
    }


    return (
        <Box mt={{ md: '3em' }}>

            <Box >
                <Heading as='h2' size='xl' textAlign='center' fontFamily={MARTIAN_MONO}>
                    Sudoku x alvarorom3
                </Heading>
                <Stack>
                    <MainMenuButton
                        handler={onOpenDificultad}
                    >
                        Nuevo juego
                    </MainMenuButton>
                    <Grid templateColumns='3fr 1fr' gap={2}>
                        <MainMenuButton
                            id='continue'
                            handler={onContinueGame}
                            isDisabled={!hasData}
                        >
                            Continuar la partida
                        </MainMenuButton>
                        <MainMenuButton
                            id='continue'
                            handler={() => onClearSudokuState()}
                            isDisabled={!hasData}
                            backgroundColor={ENGINEERING_ORANGE}
                        >
                            <DeleteIcon />
                        </MainMenuButton>
                    </Grid>
                    <MainMenuButton
                        id='reglas'
                        handler={onOpenReglas}
                    >
                        Reglas
                    </MainMenuButton>
                    <MainMenuButton
                        id='repo'
                        handler={onOpenRepo}
                        backgroundColor={SIENNA}
                    >
                        Repositorio
                    </MainMenuButton>

                </Stack>
            </Box>

            <Reglas isOpen={isOpenReglas} onClose={onCloseReglas} />
            <Repo isOpen={isOpenRepo} onClose={onCloseRepo} />
            <Dificultad isOpen={isOpenDificultad} onClose={onCloseDificultad} onStartGame={onStartGame} />

        </Box>
    )
}
