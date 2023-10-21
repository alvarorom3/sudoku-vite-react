import ModalGeneric from '../ModalGeneric';
import { Grid, ModalHeader, ModalBody } from '@chakra-ui/react';
import MainMenuButton from '../../buttons/MainMenuButton';

export default function Dificultad({ isOpen, onClose, onStartGame }) {
    function handleClick(e) {
        onStartGame(e);
        onClose();
    }

    return (
        <ModalGeneric isOpen={isOpen} onClose={onClose}>
            <ModalHeader textAlign='center' >Elegir Dificultad</ModalHeader>
            <ModalBody>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
                    gap={2}
                >
                    <MainMenuButton
                        id='easy'
                        handler={handleClick}
                    >
                        Facil
                    </MainMenuButton>
                    <MainMenuButton
                        id='simple'
                        handler={handleClick}
                    >
                        Simple
                    </MainMenuButton>
                    <MainMenuButton
                        id='intermediate'
                        handler={handleClick}
                    >
                        Medio
                    </MainMenuButton>
                    <MainMenuButton
                        id='expert'
                        handler={handleClick}
                    >
                        Experto
                    </MainMenuButton>
                </Grid>
            </ModalBody>

        </ModalGeneric>
    )
}
