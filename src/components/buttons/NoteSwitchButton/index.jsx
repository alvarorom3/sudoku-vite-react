import { Button, Box, Text } from '@chakra-ui/react';
import { COPPER, EARTH_YELLOW } from '../../../constants/styleValues';
import PencilIcon from '../../../icons/PencilIcon';

export default function NoteSwitchButton({ onClickHandler, anotation }) {
    return (
        <Button
            onClick={onClickHandler}
            variant={`${anotation ? 'outline' : 'solid'}`}
            backgroundColor={`${anotation ? COPPER : '#ffffff00'}`}
            width='fit-content'
            size={{ base: 'sm', sm: 'md', md: 'lg' }}
            _hover={{
                bg: COPPER
            }}
        >
            <Text display={{ base: 'none', md: 'inline' }} ml={1}>Notas</Text>
            <PencilIcon />
            <Box p={1} position='absolute' bottom={-1} right={-1} backgroundColor={EARTH_YELLOW} borderRadius={8} >
                {anotation ? 'On' : 'Off'}
            </Box>
        </Button>
    )
}
