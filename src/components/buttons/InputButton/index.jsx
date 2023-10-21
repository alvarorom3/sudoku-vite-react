import { Button } from '@chakra-ui/react';
import { SIENNA, ISABELLINE, MARTIAN_MONO, COPPER } from '../../../constants/styleValues';

export default function InputButton({ value, handler, anotation, isDisabled }) {
    return (
        <Button
            variant={`${anotation ? 'outline' : 'solid'}`}
            onClick={() => handler(value)}
            isDisabled={isDisabled}
            width='80%'
            size={{ base: 'sm', sm: 'md', md: 'lg' }}
            backgroundColor={`${anotation ? '#732f1700' : SIENNA}`}
            borderColor='#732f17'
            color={`${anotation ? SIENNA : ISABELLINE}`}
            fontFamily={MARTIAN_MONO}
            fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
            _hover={{
                bg: COPPER,
                color: SIENNA
            }}
        >
            {value}
        </Button>
    )
}
