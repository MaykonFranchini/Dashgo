import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from 'react-icons/ri'
import { Flex, Box, Stack, Text, Link, Icon } from '@chakra-ui/react'

export function Sidebar() {
  return (
    
    <Box as="aside" width="64" marginRight="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">GERAL</Text>
          <Stack spacing="4" marginTop="8" align="stretch">
            <Link display="flex" align="center" >
              <Icon as={RiDashboardLine} fontSize="20" />
              <Text marginLeft="4" fontWeight="medium" >Dashboard</Text>
            </Link>

            <Link display="flex" align="center" >
              <Icon as={RiContactsLine} fontSize="20" />
              <Text marginLeft="4" fontWeight="medium" >Usuarios</Text>
            </Link>
          </Stack>
        </Box>

        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">AUTOMACAO</Text>
          <Stack spacing="4" marginTop="8" align="stretch">
            <Link display="flex" align="center" >
              <Icon as={RiInputMethodLine} fontSize="20" />
              <Text marginLeft="4" fontWeight="medium" >Formularios</Text>
            </Link>

            <Link display="flex" align="center" >
              <Icon as={RiGitMergeLine} fontSize="20" />
              <Text marginLeft="4" fontWeight="medium" >Automacao</Text>
            </Link>
          </Stack>
        </Box>
      </Stack>

    </Box>
  )
}