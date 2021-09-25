import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Thead, Th, Tr, Tbody, Td, Text, useBreakpointValue, Spinner } from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header/Index';
import { Sidebar } from '../../components/Sidebar/Index'
import { Pagination } from '../../components/Pagination/Index';
import Link from 'next/link'
import { useQuery } from 'react-query';


export default function UserList() {

  const {data, isLoading, error } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json()

    const users = data.users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR')
      };
    })

    return users;
  }, {
    staleTime: 1000 * 5 // -- 5 seg -- determina o tempo em que os dados permanecem fresh, ou seja, sem necessidade de refecth.
  })


  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })



  return (
    <Box>
      <Header />
      <Flex width="100%" marginY="6" maxWidth={1480} marginX="auto" paddingX="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} backgroundColor="gray.800" padding={["4","8"]}>
          <Flex marginBottom="8" justifyContent="space-between" alignItems="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>
            <Link href="/users/create" passHref>
              <Button 
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                iconSpacing={isWideVersion ? '1.5': '-0.5'}
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
              {isWideVersion && 'Criar novo'}
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) :  error ? (
            <Flex justify="center" ><Text>Erro ao carregar os dados</Text></Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha" >
              <Thead>
                <Tr>
                  <Th paddingX={["4","4","6"]} color="gray.300" width={["6","8"]} > 
                    <Checkbox colorScheme="pink" />
                  </Th>
                  <Th>Usuário</Th>
                  { isWideVersion && <Th>Data de cadastro</Th>}
                  <Th width="8"></Th>
                </Tr>
              </Thead>
              <Tbody>
                
                {data.map(user => {
                  return (
                    <Tr key={user.id}>
                  <Td paddingX={["4","4","6"]}>
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">{user.name}</Text>
                      <Text fontSize="sm" color="gray.300">{user.email}</Text>
                    </Box>
                  </Td>
                  { isWideVersion && <Td>{user.createdAt}</Td> }
                  <Td>
                    <Button 
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="purple"
                      iconSpacing={isWideVersion ? '1.5': '-0.5'}
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                    >
                      {isWideVersion && 'Editar'}
                    </Button>
                  </Td>
                </Tr>
                  )
                })}
              </Tbody>
            </Table>
            <Pagination />
          </>
          )}

        </Box>
      </Flex>

    </Box>
  )
}