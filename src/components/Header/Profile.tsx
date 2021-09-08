import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

export function Profile() {
    return (
        <Flex align="center">
            <Box marginRight="4" textAlign="right">
                <Text>Maykon Franchini</Text>
                <Text color="gray.300" fontSize="small">maykonfranchini2017@gmail.com</Text>
            </Box>
            <Avatar size="md" name="Maykon Franchini" src="https://github.com/MaykonFranchini.png" />
        </Flex>
    )
}