import { createContext, useContext, Dispatch, SetStateAction } from 'react'

export type StockContentState = {
    filterParam: {label:string, value:string},
    itemSearch:string,
    data: any,
    pagination: number
  }

export type StockContentActions = {
  setFilterParam:Dispatch<SetStateAction<{label:string, value:string}>>,
  setItemSearch: Dispatch<SetStateAction<string>>,
  setData: Dispatch<SetStateAction<any>>
  setPagination: Dispatch<SetStateAction<number>>
}

export const StockStateContext = createContext<StockContentState>({
    filterParam: {label:'...', value:''},
    itemSearch: '',
    data: [],
    pagination: 0
})

export const StockActionsContext = createContext<StockContentActions>({
    setFilterParam: () => {},
    setItemSearch: () => {},
    setData: () => {},
    setPagination: () => {},
})

export const useStockStateContext = () => useContext(StockStateContext)

export const useStockActionsContext = () => useContext(StockActionsContext)