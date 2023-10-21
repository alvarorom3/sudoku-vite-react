import { Button } from '@chakra-ui/react';
import { COPPER, ISABELLINE, EARTH_YELLOW, SIENNA } from '../../../constants/styleValues';

export default function MainMenuButton({ children, handler, id = null, isDisabled = false, backgroundColor = null }) {
    return (
        <Button
            id={id}
            onClick={handler}
            isDisabled={isDisabled}
            backgroundColor={backgroundColor ? backgroundColor : COPPER}
            color={ISABELLINE}
            size={{ base: 'sm', sm: 'md', md: 'lg' }}
            fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
            fontWeight='semibold'
            letterSpacing='0.1rem'

            _active={{
                bg: EARTH_YELLOW,
                color: SIENNA
            }}
            _hover={{
                bg: EARTH_YELLOW,
                color: SIENNA
            }}
        >
            {children}
        </Button >
    )
}
