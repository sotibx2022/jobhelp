import React, { ReactNode } from 'react'
import { CommonFooter, PagesHeader } from '../_components'
interface layoutProps {
    children: ReactNode
}
const RootLayout: React.FC<layoutProps> = ({ children }) => {
    return (
        <div className='container'>
            <PagesHeader />
            {children}
            <CommonFooter />
        </div>
    )
}
export default RootLayout