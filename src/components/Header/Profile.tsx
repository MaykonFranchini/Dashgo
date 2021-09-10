import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

interface ProfileProps {
    showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && 
                <Box marginRight="4" textAlign="right">
                    <Text>Maykon Franchini</Text>
                    <Text color="gray.300" fontSize="small">maykonfranchini2017@gmail.com</Text>
                </Box>
            }
            <Avatar size="md" name="Maykon Franchini" src="https://github.com/MaykonFranchini.png" />
        </Flex>
    )
}