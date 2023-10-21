import ModalGeneric from '../ModalGeneric';
import { ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import MainMenuButton from '../../buttons/MainMenuButton';
import { ENGINEERING_ORANGE } from '../../../constants/styleValues';

export default function ConfirmarReinicio({ isOpen, onClose, onRestart }) {

    function handleRestart() {
        onRestart();
        onClose();
    }

    return (
        <ModalGeneric isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
            <ModalHeader>Reiniciar</ModalHeader>

            <ModalBody>
                Confirmar reinicio del puzzle. Perdera todo su progreso.
            </ModalBody>

            <ModalFooter display='flex' justifyContent='space-evenly'>
                <MainMenuButton handler={() => handleRestart()} backgroundColor={ENGINEERING_ORANGE} >
                    Reiniciar
                </MainMenuButton>
                <MainMenuButton handler={onClose}>Cancelar</MainMenuButton>
            </ModalFooter>

        </ModalGeneric>
    )
}
