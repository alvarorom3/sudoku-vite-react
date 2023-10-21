import ModalGeneric from '../ModalGeneric';
import { ModalHeader, ModalBody, Grid, UnorderedList, ListItem, Kbd, Heading, Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import BackspaceIcon from '../../../icons/BackspaceIcon';
import SaveIcon from '../../../icons/SaveIcon';
import RestartIcon from '../../../icons/RestartIcon';
import UndoIcon from '../../../icons/UndoIcon';
import RedoIcon from '../../../icons/RedoIcon';
import PencilIcon from '../../../icons/PencilIcon';

export default function Reglas({ isOpen, onClose, defaultIndex = 0 }) {

    return (
        <ModalGeneric isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
            <ModalHeader></ModalHeader>

            <ModalBody>
                <Tabs isFitted variant='line' colorScheme='orange' defaultIndex={defaultIndex}>
                    <TabList>
                        <Tab>Reglas</Tab>
                        <Tab>Teclas Rápidas</Tab>
                    </TabList>
                    <TabPanels p='2rem'>

                        <TabPanel>
                            <UnorderedList>
                                <ListItem>La cuadrícula del Sudoku tiene 9x9 espacios.</ListItem>
                                <ListItem>Solo puedes usar los números del 1 al 9.</ListItem>
                                <ListItem>Cada bloque de 3x3 solo puede contener números del 1 al 9.</ListItem>
                                <ListItem>Cada columna vertical solo puede contener números del 1 al 9.</ListItem>
                                <ListItem>Cada fila horizontal solo puede contener números del 1 al 9.</ListItem>
                                <ListItem>Cada número de un bloque de 3x3, de una columna vertical o de una fila horizontal solo puede usarse una vez.</ListItem>
                                <ListItem>La partida acaba cuando se completa toda la cuadrícula del Sudoku con los números correctos.</ListItem>
                            </UnorderedList>
                        </TabPanel>
                        <TabPanel>
                            <Heading size='md'>Teclas Rápidas</Heading>


                            <Grid templateColumns='3fr 1fr'>
                                <Text>Números:</Text>
                                <Text><Kbd bg='#c9beaf'>1</Kbd> al <Kbd bg='#c9beaf'>9</Kbd></Text>
                                <Text>Notas On/Off:</Text>  <Text> <Kbd bg='#c9beaf'>space</Kbd></Text>
                                <Text>Borrar nota: </Text> <Text> <Kbd bg='#c9beaf'>backspace</Kbd></Text>
                                <Text>Deseleccionar: </Text> <Text> <Kbd bg='#c9beaf'>escape</Kbd> </Text>
                            </Grid>

                            <Heading size='md' mt={4}>Controles</Heading>
                            <Grid templateColumns='3fr 1fr'>
                                <Text>Guardar partida:</Text><SaveIcon />
                                <Text>Reiniciar puzzle:</Text><RestartIcon />
                                <Text>Deshacer:</Text><UndoIcon />
                                <Text>Rehacer</Text><RedoIcon />
                                <Text>Notas On/Off:</Text><PencilIcon />
                                <Text>Borrar nota:</Text><BackspaceIcon />

                            </Grid>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </ModalBody>

        </ModalGeneric>
    )
}
