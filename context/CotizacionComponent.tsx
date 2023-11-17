import React, { useEffect, useState } from 'react'
import { CtzActionsContext, CtzStateContext } from './CotizacionContext'
import { Expenses } from '@/types/extraExpenses'
import { WorkHand } from '@/types/workHand'
import { CtzInfoProp } from '@/types/ctz'
import { useRouter } from 'next/router'
import useGetCtz from '@/hooks/useGetCtz'

interface RecipeProviderProps {
    children: React.ReactNode,
}

const CtzComponent:React.FC<RecipeProviderProps> = ({ children }) => {
    const router = useRouter()
    const { ctz } = useGetCtz()
    const [editId, setEditId] = useState<string | null>(null)    
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

    useEffect(() => {
      if(ctz && router.query.cid){
        setEditId(router?.query?.cid.toString())
        const ctzData = ctz.filter((eachCtz) => (eachCtz.id === router.query.cid))
        if(ctzData.length > 0 && ctzData[0]?.ctzPeople){
          setCtzPeople(ctzData[0]?.ctzPeople)
          setCtzCake(ctzData[0]?.ctzCake)
          setCtzFilling(ctzData[0]?.ctzFilling)
          setCtzCoverage(ctzData[0]?.ctzCoverage)
          setCtzExtra(ctzData[0]?.ctzExtra)
          setCtzWorkHand(ctzData[0]?.ctzWorkHand)
          setCtzEarn(ctzData[0]?.ctzEarn)
          setCtzName(ctzData[0]?.ctzName)
        }
      } else {
        setEditId(null)
      }
    }, [ctz, router.query.cid])

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
            editId,
            progress
        }}
        >
            {children}  
        </CtzStateContext.Provider>
    </CtzActionsContext.Provider>
  )
}

export default CtzComponent
