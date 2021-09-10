import { Flex, Button, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatorio').email('E-mail invalido'),
  password: yup.string().required('Senha obrigatoria'),
})

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const  handleSignIn:SubmitHandler<SignInFormData> = async (values) => {
    
    await new Promise( resolve => setTimeout(resolve, 2000))
    console.log(values)
  }

  const { errors } = formState

  return (
    <Flex 
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
        >
      <Flex 
        as="form" 
        width="100%" 
        maxWidth={360} 
        backgroundColor="gray.800" 
        padding="8"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input name="email" type="email" label="E-mail" {...register('email')} error={errors.email} />
          <Input name="password" type="password" label="Senha" {...register('password')} error={errors.password} />
          

          <Button type="submit" marginTop="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>Entrar</Button>
      
        </Stack>
      </Flex>
    </Flex>
  )
}
