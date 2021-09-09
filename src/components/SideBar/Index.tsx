import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from 'react-icons/ri'
import { Box, Stack } from '@chakra-ui/react'
import { NavSection } from './NavSection'
import { NavLink } from './NavLink'

export function Sidebar() {
  return (
    
    <Box as="aside" width="64" marginRight="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL" >
            <NavLink icon={RiDashboardLine} >Dashboard</NavLink>
            <NavLink icon={RiContactsLine} >Usuários</NavLink>
        </NavSection>

        <NavSection title="AUTOMACAO">
            <NavLink icon={RiInputMethodLine}>Formulários</NavLink>
            <NavLink icon={RiGitMergeLine} >Automação</NavLink>
        </NavSection>
      </Stack>

    </Box>
  )
}