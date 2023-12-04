import { createContext, useContext, Dispatch, SetStateAction } from 'react'

export type StockContentState = {
    filterParam: {label:string, value:string},
    itemSearch:string,
    data: any,
    pagination: number,
    showProductModal: boolean
  }

export type StockContentActions = {
  setFilterParam:Dispatch<SetStateAction<{label:string, value:string}>>,
  setItemSearch: Dispatch<SetStateAction<string>>,
  setData: Dispatch<SetStateAction<any>>
  setPagination: Dispatch<SetStateAction<number>>
  setShowProductModal: Dispatch<SetStateAction<boolean>>
}

export const StockStateContext = createContext<StockContentState>({
    filterParam: {label:'...', value:''},
    itemSearch: '',
    data: [],
    pagination: 0,
    showProductModal: false
})

export const StockActionsContext = createContext<StockContentActions>({
    setFilterParam: () => {},
    setItemSearch: () => {},
    setData: () => {},
    setPagination: () => {},
    setShowProductModal: () => {},
})

export const useStockStateContext = () => useContext(StockStateContext)

export const useStockActionsContext = () => useContext(StockActionsContext)