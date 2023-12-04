import React, { useState } from 'react'
import { FILTER_OPTIONS } from '@/constant/stock'
import { StockActionsContext, StockStateContext } from './StockContext'

interface RecipeProviderProps {
    children: React.ReactNode
}

const StockTableComponent:React.FC<RecipeProviderProps> = ({ children}) => {
    const [data, setData] = useState<any>([])
    const [pagination, setPagination] = useState<number>(1)
    const [filterParam, setFilterParam] = useState<{label:string, value:string}>({label:FILTER_OPTIONS[0].label, value:FILTER_OPTIONS[0].value})
    const [itemSearch, setItemSearch] = useState<string>('')
    const [showProductModal, setShowProductModal] = useState<boolean>(false)
    
  return (
    <StockActionsContext.Provider
      value={{            
        setFilterParam,
        setItemSearch,
        setData,
        setPagination,
        setShowProductModal
      }}
      >
        <StockStateContext.Provider
        value={{
            filterParam,
            itemSearch,
            data,
            pagination,
            showProductModal
        }}
        >
            {children}  
        </StockStateContext.Provider>
    </StockActionsContext.Provider>
  )
}

export default StockTableComponent