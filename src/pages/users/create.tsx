import { Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Button } from '@chakra-ui/react';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header/Index';
import { Sidebar } from '../../components/Sidebar/Index'
import Link from 'next/link'


export default function CreateUser() {
  return (
    <Box>
      <Header />
      <Flex width="100%" maxWidth={1480} marginX="auto" paddingX="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} backgroundColor="gray.800" padding={["6","8"]}>
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider marginY="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
              <Input  name="name" label="Nome Completo" />
              <Input  name="email" label="E-mail" />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
              <Input  name="password" type="password" label="Senha" />
              <Input  name="password_confirmation" type="password" label="Confirmação da senha" />
            </SimpleGrid>

          </VStack>
          <Flex marginTop="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref >
                <Button as="a" colorScheme="whiteAlpha" >Cancelar</Button>
              </Link>
              <Button colorScheme="pink" >Salvar</Button>
              
            </HStack>

          </Flex>
        </Box>
      </Flex>

    </Box>
  )
}