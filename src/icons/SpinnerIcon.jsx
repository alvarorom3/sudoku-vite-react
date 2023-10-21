import { Box, Spinner } from '@chakra-ui/react'

export default function SpinnerIcon() {
    return (
        <Box height="90vh" display="flex" justifyContent="center" alignItems="center">
            <Spinner
                thickness='9px'
                speed='0.65s'
                emptyColor='#f6efe9'
                color='#732f17'
                size='xl'
            />
        </Box>
    )
}
