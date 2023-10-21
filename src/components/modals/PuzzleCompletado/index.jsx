import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from '@chakra-ui/react';
import { ISABELLINE } from '../../../constants/styleValues';
import MainMenuButton from '../../buttons/MainMenuButton';

export default function PuzzleCompletado({ isOpen, onClose, errorCount, onBackToMenu, onRestart }) {

    function handleRestart() {
        onRestart();
        onClose();
    }
    function handleBackToMenu() {
        onBackToMenu();
        onClose();
    }

    return (
        <Modal isOpen={isOpen} size='xl' onClose={onClose} >
            <ModalOverlay
                backdropFilter='blur(10px) '
            />
            <ModalContent my='auto' bg={ISABELLINE} textAlign='center' boxShadow='0px 0px 99px 47px rgba(242, 190, 92, 0.75 )'>
                <ModalHeader >Puzzle Completado</ModalHeader>

                <ModalBody>
                    Total de errores: {errorCount}
                </ModalBody>

                <ModalFooter display='flex' justifyContent='space-around'>
                    <MainMenuButton handler={() => handleBackToMenu()}>
                        Menu Principal
                    </MainMenuButton>
                    <MainMenuButton handler={() => handleRestart()}>
                        Reiniciar
                    </MainMenuButton>
                </ModalFooter>
            </ModalContent>
        </Modal>

    )
}
