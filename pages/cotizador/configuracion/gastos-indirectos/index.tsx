import PageContainer from '@/components/layout/PageContainer'
import ExtraExpenses from '@/components/layout/cotizador/configuracion/ExtraExpenses'
import React from 'react'
import { FaCashRegister } from 'react-icons/fa'

const IndirectExpenses = () => {
  return (
    <PageContainer title='Gastos indirectos' titleIcon={<FaCashRegister />}>
        <ExtraExpenses />
    </PageContainer>
  )
}

export default IndirectExpenses
