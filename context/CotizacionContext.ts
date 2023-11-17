import { CtzInfoProp } from '@/types/ctz'
import { Expenses } from '@/types/extraExpenses'
import { WorkHand } from '@/types/workHand'
import { createContext, useContext, Dispatch, SetStateAction } from 'react'

export type CtzContentState = {
    ctzPeople: string,
    ctzCake: string,
    ctzFilling: string,
    ctzCoverage: string,
    ctzExtra: Expenses[],
    ctzWorkHand: WorkHand,
    ctzEarn: number,
    ctzName: string,
    pageTitle: string,
    ctzInfo: CtzInfoProp,
    editId: string | null,
    progress: number
  }

export type CtzContentActions = {
    setCtzPeople: Dispatch<SetStateAction<string>>,
    setCtzCake:Dispatch<SetStateAction<string>>,
    setCtzFilling:Dispatch<SetStateAction<string>>,
    setCtzCoverage:Dispatch<SetStateAction<string>>,
    setCtzExtra:Dispatch<SetStateAction<Expenses[]>>,
    setCtzWorkHand:Dispatch<SetStateAction<WorkHand>>,
    setCtzEarn:Dispatch<SetStateAction<number>>,
    setCtzName:Dispatch<SetStateAction<string>>,
    setPageTitle: Dispatch<SetStateAction<string>>,
    setCtzInfo: Dispatch<SetStateAction<CtzInfoProp>>,
    setProgress: Dispatch<SetStateAction<number>>
}

export const CtzStateContext = createContext<CtzContentState>({
    ctzPeople: '',
    ctzCake:'',
    ctzFilling: '',
    ctzCoverage: '',
    ctzExtra: [],
    ctzWorkHand: {hours:0, hoursPrice:0},
    ctzEarn: 0,
    ctzName: '',
    pageTitle: 'Crear cotización',
    ctzInfo: {
        ctzCakePrice: '',
        ctzCakeName: '',
        ctzFillingPrice: '',
        ctzFillingName: '',
        ctzCoveragePrice: '',
        ctzCoverageName: '',
        ctzExtraPrice: '',
        ctzWhPrice: '',
        ctzIndirectExpenses: '',
        ctzEarn: '',
        ctzTotalPrice: '',
        ctzRoundedAmount: ''
    },
    editId: null,
    progress: 0
})

export const CtzActionsContext = createContext<CtzContentActions>({
    setCtzPeople: () => {},
    setCtzCake: () => {},
    setCtzFilling: () => {},
    setCtzCoverage: () => {},
    setCtzExtra: () => {},
    setCtzWorkHand: () => {},
    setCtzEarn: () => {},
    setCtzName: () => {},
    setPageTitle: () => {},
    setCtzInfo: () => {},
    setProgress: () => {}
})

export const useCtzStateContext = () => useContext(CtzStateContext)

export const useCtzActionsContext = () => useContext(CtzActionsContext)