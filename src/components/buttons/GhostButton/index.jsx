import { Button } from '@chakra-ui/react';
import { COPPER } from '../../../constants/styleValues';

export default function GhostButton({ children, onClickHandler, isDisabled = false }) {
    return (
        <Button
            onClick={onClickHandler}
            isDisabled={isDisabled}
            variant='ghost'
            width='fit-content'
            size={{ base: 'sm', sm: 'md', md: 'lg' }}
            _hover={{
                bg: COPPER
            }}
        >
            {children}
        </Button>
    )
}
