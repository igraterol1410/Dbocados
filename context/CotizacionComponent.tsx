import React, { useState } from 'react'
import { CtzActionsContext, CtzStateContext } from './CotizacionContext'
import { Expenses } from '@/types/extraExpenses'
import { WorkHand } from '@/types/workHand'
import { CtzInfoProp } from '@/types/ctz'

interface RecipeProviderProps {
    children: React.ReactNode,
}

const CtzComponent:React.FC<RecipeProviderProps> = ({ children }) => {
    const [ctzPeople, setCtzPeople] = useState<string>('')    
    const [ctzCake, setCtzCake] = useState<string>('')    
    const [ctzFilling, setCtzFilling] = useState<string>('')    
    const [ctzCoverage, setCtzCoverage] = useState<string>('')    
    const [ctzExtra, setCtzExtra] = useState<Expenses[]>([])    
    const [ctzWorkHand, setCtzWorkHand] = useState<WorkHand>({hours:0, hoursPrice:0})    
    const [ctzEarn, setCtzEarn] = useState<number>(0)    
    const [ctzName, setCtzName] = useState<string>('')    
    const [ctzInfo, setCtzInfo] = useState<CtzInfoProp>({
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
  })
    const [pageTitle, setPageTitle] = useState<string>('Crear cotización')
    const [progress, setProgress] = useState<number>(0)

  return (
    <CtzActionsContext.Provider
      value={{            
        setCtzPeople,
        setCtzCake,
        setCtzFilling,
        setCtzCoverage,
        setCtzExtra,
        setCtzWorkHand,
        setCtzEarn,
        setCtzName,
        setPageTitle,
        setCtzInfo,
        setProgress
      }}
      >
        <CtzStateContext.Provider
        value={{
            ctzPeople,
            ctzCake,
            ctzFilling,
            ctzCoverage,
            ctzExtra,
            ctzWorkHand,
            ctzEarn,
            ctzName,
            pageTitle,
            ctzInfo,
            progress
        }}
        >
            {children}  
        </CtzStateContext.Provider>
    </CtzActionsContext.Provider>
  )
}

export default CtzComponent
