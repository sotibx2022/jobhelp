import { RootState } from '@/app/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import ErrorToast from './ErrorToast'
import SuccessToast from './SuccessToast'
const ToastComponent = () => {
    const toastValues = useSelector((state: RootState) => state.toast)
    const { message, toastType } = toastValues
    console.log(message,toastType);
    return (
        <>
            {toastType === 'error' && <ErrorToast message={message} />}
            {toastType === 'success' && <SuccessToast message={message} />}
        </>
    )
}
export default ToastComponent