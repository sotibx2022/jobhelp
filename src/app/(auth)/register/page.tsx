"use client"
import React from 'react'
import { Lock, Mail, User } from 'lucide-react'
import FormInput from '@/app/_components/structures/input/FormInput'
const page = () => {
    return (
       <>
               <FormInput label={'Full Name'} type='text' placeholder={'Joon Masroon Thapa'} Icon={User} onChange={function (): void {
            throw new Error('Function not implemented.')
        } }/>
        <FormInput label={'Email'} type='text' placeholder={'eg. joonmasron@gmail.com'} Icon={Mail} onChange={function (): void {
            throw new Error('Function not implemented.')
        } }/>
        <FormInput label={'Password'} type='password' placeholder={'eg. MyP@ssw0rd!23'} Icon={Lock} onChange={function (): void {
            throw new Error('Function not implemented.')
        } }/>
        <FormInput label={'Confirm Password'} type='password' placeholder={'eg. MyP@ssw0rd!23'} Icon={Lock} onChange={function (): void {
            throw new Error('Function not implemented.')
        } }/>
        </>
    )
}
export default page