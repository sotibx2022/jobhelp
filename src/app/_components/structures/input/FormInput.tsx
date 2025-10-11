"use client"
import React, { useState, forwardRef } from 'react'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, LucideIcon } from 'lucide-react'
interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    placeholder: string
    Icon: LucideIcon
    align?: string
    type: string,
    error?:string
}
const FormInput = forwardRef<HTMLInputElement, IFormInputProps>(
    ({ label, placeholder, Icon, align, type,error, ...rest }, ref) => {
        const [inputType, setInputType] = useState(type);
        return (
            <div>
                <Label htmlFor={label}>{label}</Label>
                <InputGroup>
                    <InputGroupInput
                        placeholder={placeholder}
                        id={label}
                        ref={ref}
                        type={inputType}
                        {...rest}
                    />
                    <InputGroupAddon>
                        <Icon />
                    </InputGroupAddon>
                    {type === 'password' && (
                        <InputGroupAddon align="inline-end">
                            {inputType === 'password' ? (
                                <InputGroupButton
                                    type="button"
                                    onClick={() => setInputType('text')}
                                >
                                    <Eye />
                                </InputGroupButton>
                            ) : (
                                <InputGroupButton
                                    type="button"
                                    onClick={() => setInputType('password')}
                                >
                                    <EyeOff />
                                </InputGroupButton>
                            )}
                        </InputGroupAddon>
                    )}
                </InputGroup>
                 <p className="text-red-500 text-sm mt-1">
              {error}
            </p>
            </div>
        )
    }
)
export default FormInput
