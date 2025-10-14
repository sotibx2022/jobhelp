"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormInput from "@/app/_components/structures/input/FormInput"
import { Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { loginFormSchema } from "@/app/types/userAuth"
import GoogleLogin from "../components/GoogleLogin"
import AuthLinks from "../components/AuthLinks"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
type LoginFormData = z.infer<typeof loginFormSchema>
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange'
  })
  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data)
  }
  return (
    <section className="pageCenter">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <FormInput
                label="Email"
                type="text"
                placeholder="eg. joonmasron@gmail.com"
                Icon={Mail}
                {...register("email")}
                error={errors.email?.message}
              />
            </div>
            <div>
              <FormInput
                label="Password"
                type="password"
                placeholder="eg. MyP@ssw0rd!23"
                Icon={Lock}
                {...register("password")}
                error={errors.password?.message}
              />
            </div>
            <Button>
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <GoogleLogin />
          <AuthLinks component="login" />
        </CardFooter>
      </Card>
    </section>
  )
}
export default LoginPage
