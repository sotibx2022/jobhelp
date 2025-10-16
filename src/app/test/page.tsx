"use client"
import React from 'react'
import SuccessToast from '../_components/absoluteComponents/toastComponents/SuccessToast'
import ErrorToast from '../_components/absoluteComponents/toastComponents/ErrorToast'
const page = () => {
  return (
    <div>
        <SuccessToast/>
        <ErrorToast/>
    </div>
  )
}
export default page