import { Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Button } from '@chakra-ui/react';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header/Index';
import { Sidebar } from '../../components/Sidebar/Index'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { useRouter } from 'next/router';


type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name:yup.string().required('Nome obrigatorio'),
  email: yup.string().required('E-mail obrigatorio').email('E-mail invalido'),
  password: yup.string().required('Senha obrigatoria').min(6, 'No minimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
})


export default function CreateUser() {
  const router = useRouter()
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const { register, handleSubmit, formState} = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values)

    router.push('/users')
  }

  return (
    <Box>
      <Header />
      <Flex width="100%" maxWidth={1480} marginX="auto" paddingX="6">
        <Sidebar />

        <Box 
          as='form' 
          flex="1" 
          borderRadius={8} 
          backgroundColor="gray.800" 
          padding={["6","8"]} 
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider marginY="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
              <Input  name="name" label="Nome Completo" {...register('name')} error={errors.name} />
              <Input  name="email" label="E-mail" {...register('email')} error={errors.email} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
              <Input  name="password" type="password" label="Senha" {...register('password')} error={errors.password} />
              <Input  name="password_confirmation" type="password" label="Confirmação da senha" {...register('password_confirmation')} error={errors.password_confirmation} />
            </SimpleGrid>

          </VStack>
          <Flex marginTop="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref >
                <Button as="a" colorScheme="whiteAlpha" >Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting} >Salvar</Button>
              
            </HStack>

          </Flex>
        </Box>
      </Flex>

    </Box>
  )
}