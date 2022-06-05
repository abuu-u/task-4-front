import { yupResolver } from '@hookform/resolvers/yup'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../common/validation-schemas'
import Form from '../components/form'
import Input from '../components/input'
import MainLayout from '../components/layouts/main-layout'
import { useAppDispatch } from '../lib/store'
import { ErrorResponse } from '../services/api'
import { LoginData, loginThunk } from '../slices/user-slice'

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })

  const [error, setError] = useState('')

  const dispatch = useAppDispatch()

  const router = useRouter()

  return (
    <MainLayout>
      <Form
        onSubmit={handleSubmit(async (data) => {
          setError('')

          const result = await dispatch(loginThunk(data))

          if (result.meta.requestStatus === 'rejected') {
            setError((result.payload as ErrorResponse).message)
          } else {
            router.push('/')
          }
        })}
        submitText="Login"
        header="Login"
        error={error}
      >
        <Input
          id="email"
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
      </Form>
    </MainLayout>
  )
}

export default Login
