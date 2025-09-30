"use client"
import React, { useState } from 'react'
interface NavigationProps {
    totalResults: number,
    resultsPerPage: number,
    returnedPageNumber: (pageNumber: number) => void;
}
const Navigation: React.FC<NavigationProps> = ({ totalResults, resultsPerPage, returnedPageNumber }) => {
    const [pageNumber, setPageNumber] = useState(1)
    return (
        <div>
                    <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>
                    {pageNumber}
                    <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
        </div>
    )
}
export default Navigation