import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Thead, Th, Tr, Tbody, Td, Text, useBreakpointValue, Spinner, Link } from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header/Index';
import { Sidebar } from '../../components/Sidebar/Index'
import { Pagination } from '../../components/Pagination/Index';
import NextLink from 'next/link'
import { getUsers, useUsers } from '../../services/hooks/useUsers';
import { useState } from 'react';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';
import { GetServerSideProps } from 'next';



export default function UserList() {
  const [page, setPage] = useState(1);

  const {data, isLoading, isFetching, error } = useUsers(page)


  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(['user', userId],async () => {
      const response = await api.get(`users/${userId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10 // 10 minutes
    })
  }



  return (
    <Box>
      <Header />
      <Flex width="100%" marginY="6" maxWidth={1480} marginX="auto" paddingX="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} backgroundColor="gray.800" padding={["4","8"]}>
          <Flex marginBottom="8" justifyContent="space-between" alignItems="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" marginLeft="4" color="gray.500" />}
              </Heading>
            <NextLink href="/users/create" passHref>
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
            </NextLink>
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
                
                {data.users.map(user => {
                  return (
                    <Tr key={user.id}>
                  <Td paddingX={["4","4","6"]}>
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                      <Text fontWeight="bold">{user.name}</Text>
                      </Link>
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
            <Pagination totalCountOfRegisters={data.totalCount} currentPage={page} onPageChange={setPage} />
          </>
          )}

        </Box>
      </Flex>

    </Box>
  )
}


// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1)

//   return {
//     props: {
//       users,
//     }
//   }
// }