"use client"
import React, { useState, forwardRef } from "react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Circle, Eye, EyeOff, Loader2, LucideIcon } from "lucide-react"
import { useDebounce } from "@/app/functions/helperFunctions/debounce"
import InputMessage from "../stringMessage/FormInputMessage"
interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    placeholder: string
    Icon: LucideIcon
    align?: string
    type: string
    error?: string
}
const FormInput = forwardRef<HTMLInputElement, IFormInputProps>(
    ({ label, placeholder, Icon, align, type, error, onChange, ...rest }, ref) => {
        const [inputType, setInputType] = useState(type)
        const [status, setStatus] = useState<"idle" | "validating" | "error" | "success">("idle")
        const [inputValue, setInputValue] = useState("")
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value)
            setStatus("validating")
            onChange?.(event) // forward to React Hook Form
        }
        useDebounce({
            callback: () => {
                if (error) {
                    setStatus("error")
                } else if (inputValue.trim() !== "") {
                    setStatus("success")
                } else {
                    setStatus("idle")
                }
            },
            delay: 800,
            dependencies: [error, inputValue],
        })
        const renderStatusText = () => {
            if (status === "error") return <InputMessage type="error" message={error || "Something Went Wrong"} />
            return null
        }
        return (
            <div>
                <Label htmlFor={label}>{label}</Label>
                <InputGroup>
                    <InputGroupInput
                        id={label}
                        ref={ref}
                        type={inputType}
                        placeholder={placeholder}
                        {...rest}
                        onChange={handleChange}
                        autoComplete={type ==='password'?"off":"on"}
                    />
                    <InputGroupAddon align={'inline-end'}>
                        {status === "error" && (
                            <AlertCircle className="text-red-500 w-4 h-4" />
                        )}
                        {status === "success" && (
                            <CheckCircle className="text-green-500 w-4 h-4" />
                        )}
                        {status === "validating" && (
                            <Loader2 className="text-yellow-500 w-4 h-4 animate-spin" />
                        )}
                        {status === "idle" && (
                            <Circle className="text-gray-400 w-4 h-4" />
                        )}
                    </InputGroupAddon>
                    <InputGroupAddon>
                        <Icon />
                    </InputGroupAddon>
                    {type === "password" && (
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton
                                type="button"
                                onClick={() =>
                                    setInputType(inputType === "password" ? "text" : "password")
                                }
                            >
                                {inputType === "password" ? <Eye /> : <EyeOff />}
                            </InputGroupButton>
                        </InputGroupAddon>
                    )}
                </InputGroup>
                <div className="mt-1">{renderStatusText()}</div>
            </div>
        )
    }
)
export default FormInput
