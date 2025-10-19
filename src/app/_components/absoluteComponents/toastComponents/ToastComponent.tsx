import { RootState } from '@/app/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import ErrorToast from './ErrorToast'
import SuccessToast from './SuccessToast'
import InfoToast from './InfoToast'
const ToastComponent = () => {
    const toastValues = useSelector((state: RootState) => state.toast)
    const { message, toastType } = toastValues
    return (
        <>
            {toastType === 'error' && <ErrorToast message={message} />}
            {toastType === 'success' && <SuccessToast message={message} />}
            {toastType === 'info' && <InfoToast message={message} />}
        </>
    )
}
export default ToastComponent