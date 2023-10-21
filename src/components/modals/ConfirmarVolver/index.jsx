import ModalGeneric from '../ModalGeneric';
import { ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import MainMenuButton from '../../buttons/MainMenuButton';
import GhostButton from '../../buttons/GhostButton';
import { COPPER } from '../../../constants/styleValues';

export default function ConfirmarVolver({ isOpen, onClose, onSave, onBackToMenu }) {

    function handleSave() {
        onSave();
        onBackToMenu();
        onClose();
    }

    function handleBackToMenu() {
        onBackToMenu();
        onClose();
    }

    return (
        <ModalGeneric isOpen={isOpen} onClose={onClose}>
            <ModalHeader>Volver</ModalHeader>

            <ModalBody>
                ¿Quiere guardar su progreso antes de volver?
            </ModalBody>

            <ModalFooter display='flex' justifyContent='space-around'>
                <MainMenuButton handler={() => handleSave()} backgroundColor={COPPER} >
                    Guadar
                </MainMenuButton>
                <MainMenuButton handler={() => handleBackToMenu()} backgroundColor={COPPER} >
                    Volver
                </MainMenuButton>

                <GhostButton onClickHandler={onClose}>Cancelar</GhostButton>
            </ModalFooter>

        </ModalGeneric>
    )
}
