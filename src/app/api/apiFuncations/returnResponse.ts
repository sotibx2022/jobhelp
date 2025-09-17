import { NextResponse } from "next/server"
export const response = (message: string, status: number, success: boolean): NextResponse => {
    return NextResponse.json({ message, success }, { status })
}