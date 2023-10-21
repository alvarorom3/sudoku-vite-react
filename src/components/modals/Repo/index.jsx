import ModalGeneric from "../ModalGeneric";
import { ModalHeader, ModalFooter } from '@chakra-ui/react';
import GithubIcon from '../../../icons/GithubIcon';

import MainMenuButton from '../../buttons/MainMenuButton';
import { ENGINEERING_ORANGE } from "../../../constants/styleValues";

export default function Repo({ isOpen, onClose }) {
    return (
        <ModalGeneric isOpen={isOpen} onClose={onClose}>
            <ModalHeader textAlign='center'>Repositorio del proyecto</ModalHeader>

            <ModalFooter display='flex' justifyContent='center'>
                <a href="github.com" target="_blank">
                    <MainMenuButton backgroundColor={ENGINEERING_ORANGE} >
                        Repo <GithubIcon />
                    </MainMenuButton>
                </a>
            </ModalFooter>

        </ModalGeneric>
    )
}
