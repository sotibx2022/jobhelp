"use client"
import React from 'react'
import { Lock, Mail, User } from 'lucide-react'
import FormInput from '@/app/_components/structures/input/FormInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema } from '@/app/types/userAuth'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import z from 'zod'
import GoogleLogin from '../components/GoogleLogin'
import AuthLinks from '../components/AuthLinks'
import { authMutation } from '../authMutation/authMutation'
import { Button } from '@/components/ui/button'
const page = () => {
    type registerFormData = z.infer<typeof registerFormSchema>
    const { register, handleSubmit, formState: { errors } } = useForm<registerFormData>({ mode: 'onChange', resolver: zodResolver(registerFormSchema) })
    const registerMutation = authMutation('register')
    const onSubmit = (data: registerFormData) => {
       registerMutation.mutate(data)
    }
    // if(registerMutation.isPending){
    //     return <h1>is Pending</h1>
    // }
    return (
        <section className="pageCenter">
            <Card>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormInput label={'Full Name'} type='text' placeholder={'Joon Masroon Thapa'} Icon={User}
                            {...register('fullName')} error={errors.fullName?.message} />
                        <FormInput label={'Email'} type='text' placeholder={'eg. joonmasron@gmail.com'} Icon={Mail}
                            {...register('email')} error={errors.email?.message} />
                        <FormInput label={'Password'} type='password' placeholder={'eg. MyP@ssw0rd!23'} Icon={Lock}
                            {...register('password')} error={errors.password?.message} />
                        <FormInput label={'Confirm Password'} type='password' placeholder={'eg. MyP@ssw0rd!23'} Icon={Lock}
                            {...register('confirmPassword')}
                            error={errors.confirmPassword?.message} />
                            <Button variant='secondary'>Register</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <GoogleLogin />
                    <AuthLinks component="register" />
                </CardFooter>
            </Card>
        </section>
    )
}
export default page