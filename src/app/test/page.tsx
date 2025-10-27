"use client"
import React from 'react'
import SuccessToast from '../_components/absoluteComponents/toastComponents/SuccessToast'
import ErrorToast from '../_components/absoluteComponents/toastComponents/ErrorToast'
import Loading from '../_components/structures/loading/Loading'
import ProfileSkleton from '../(dashboard)/profile/ProfileSkleton'
const page = () => {
  return (
    <div>
      <ProfileSkleton/>
    </div>
  )
}
export default page