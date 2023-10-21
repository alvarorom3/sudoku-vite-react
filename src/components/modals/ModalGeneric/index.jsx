import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
} from '@chakra-ui/react';
import { ISABELLINE } from '../../../constants/styleValues';

export default function ModalGeneric({ children, isOpen, onClose, scrollBehavior = 'outside' }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={scrollBehavior}>
            <ModalOverlay />
            <ModalContent my='auto' bg={ISABELLINE} >
                <ModalCloseButton />

                {children}

            </ModalContent>
        </Modal>
    )
}
