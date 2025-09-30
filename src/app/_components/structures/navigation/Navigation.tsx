"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
interface NavigationProps {
    totalResults: number,
    resultsPerPage: number,
    returnedPageNumber: (pageNumber: number) => void;
}
const Navigation: React.FC<NavigationProps> = ({ totalResults, resultsPerPage, returnedPageNumber }) => {
    const [pageNumber, setPageNumber] = useState(1)
    const totalPages = Math.ceil(totalResults / resultsPerPage)
    useEffect(() => {
        returnedPageNumber(pageNumber)
    }, [pageNumber, returnedPageNumber])
    return (
        <div className="flexCenter mt-4">
            <Button
                variant="outline"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber(prev => prev - 1)}
            >
                <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className='secondaryHeading mx-4'>{pageNumber} / {totalResults}</span>
            <Button
                variant="outline"
                disabled={pageNumber >= totalPages}
                onClick={() => setPageNumber(prev => prev + 1)}
            >
                <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
    )
}
export default Navigation
