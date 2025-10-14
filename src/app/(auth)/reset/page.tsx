"use client"
import React from 'react'
import { Lock, Mail, User } from 'lucide-react'
import FormInput from '@/app/_components/structures/input/FormInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetFormSchema } from '@/app/types/userAuth'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import z from 'zod'
import GoogleLogin from '../components/GoogleLogin'
import AuthLinks from '../components/AuthLinks'
const page = () => {
    type resetFormData = z.infer<typeof resetFormSchema>
    const { register, handleSubmit, formState: { errors } } = useForm<resetFormData>({ mode: 'onChange', resolver: zodResolver(resetFormSchema) })
    const onSubmit = (data: resetFormData) => {
        console.log(data);
    }
    return (
        <section className="pageCenter">
            <Card>
                <CardHeader>
                    <CardTitle>Reset</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormInput label={'Email'} type='text' placeholder={'eg. joonmasron@gmail.com'} Icon={Mail}
                            {...register('email')} error={errors.email?.message} />
                        <FormInput label={'New Password'} type='password' placeholder={'eg. MyP@ssw0rd!23'} Icon={Lock}
                            {...register('newPassword')} error={errors.newPassword?.message} />
                        <FormInput label={'Confirm New Password'} type='password' placeholder={'eg. MyP@ssw0rd!23'} Icon={Lock}
                            {...register('confirmNewPassword')}
                            error={errors.confirmNewPassword?.message} />
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <GoogleLogin />
                    <AuthLinks component="reset" />
                </CardFooter>
            </Card>
        </section>
    )
}
export default page