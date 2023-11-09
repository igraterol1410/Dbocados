/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Flex, Grid, Heading, Table, TableContainer, Tbody, Td, Text, Tr, useToast } from '@chakra-ui/react'
import React, {useEffect} from 'react'
import { useCtzActionsContext, useCtzStateContext } from '@/context/CotizacionContext'
import useCtzPrice from '@/hooks/useCtzPrice'
import Loader from '@/components/layout/Loader'
import { FiSave } from 'react-icons/fi'
import { createNewCtz } from '@/services/cotizaciones'
import {v4 as uuidv4} from 'uuid'
import useGetCtz from '@/hooks/useGetCtz'
import { useCotizadorStateContext } from '@/context/CotizadorGlobalContext'

const Finish = () => {
    const toast = useToast()
    const { ctzUser, uid } = useCotizadorStateContext()
    const { ctzWorkHand, progress, ctzCake, ctzCoverage, ctzFilling, ctzExtra, ctzPeople, ctzEarn } = useCtzStateContext()
    const { setProgress, setCtzInfo } = useCtzActionsContext()
    const { cyzInfo, loading } = useCtzPrice(ctzWorkHand, ctzCake, ctzCoverage, ctzFilling, ctzExtra, ctzPeople, ctzEarn)
    const { ctz } = useGetCtz()

  useEffect(() => {
    if(cyzInfo){
        setCtzInfo(cyzInfo)
    }
  },[cyzInfo])

  const handleSaveCtz = () => {
    if(ctzUser){
        const newCtz = {
            id: uuidv4(),
            ctzWorkHand: ctzWorkHand, 
            ctzCake: ctzCake, 
            ctzCoverage: ctzCoverage, 
            ctzFilling: ctzFilling, 
            ctzExtra: ctzExtra, 
            ctzPeople: ctzPeople, 
            ctzEarn: ctzEarn
        }
        const payload = [...ctz, newCtz]
        createNewCtz(payload, uid).then(() => {
            setProgress(progress + 1)
        })
    } else {
        toast({ status: 'error', description: 'No puedes realizar esta acción' })
        setTimeout(() => {
            window.location.reload()                
        }, 2000);
    }
}

  const handleNext = () => {
    setProgress(progress + 1)
  }

  return (
    <Box maxW='95vw' bg='#fcfcfc' borderRadius={[8, 12]} p={[2, 6]} overflowY='scroll'>
        <Grid 
        templateRows={['1fr auto']}
        alignItems='center'
        gap={6}
        maxW='100%'
        >
            <Box
            w={['100%', '80%']}
            marginInline='auto'
            textAlign='center'
            >
                <Heading as='h3' fontSize={['16px', '22px']}>
                    Resumen de tu pedido
                </Heading>
                <Text mb={6} fontWeight='bold'>(tus costos)</Text>
                {
                  loading 
                  ? (
                      <Loader />
                  )
                  : (
                      <TableContainer maxW={['85vw','100%']} overflowX='scroll'>
                          <Table variant='simple'>
                              <Tbody>
                                  <Tr>
                                      <Td><b>Numero de personas: </b></Td>
                                      <Td>{ctzPeople}</Td>
                                  </Tr>
                                  <Tr>
                                      <Td><b>Torta: </b></Td>
                                      <Td>{cyzInfo?.ctzCakeName}</Td>
                                      <Td>{cyzInfo?.ctzCakePrice}</Td>
                                  </Tr>
                                  <Tr>
                                      <Td><b>Relleno: </b></Td>
                                      <Td>{cyzInfo?.ctzFillingName}</Td>
                                      <Td>{cyzInfo?.ctzFillingPrice}</Td>
                                  </Tr>
                                  <Tr>
                                      <Td><b>Cobertura: </b></Td>
                                      <Td>{cyzInfo?.ctzCoverageName}</Td>
                                      <Td>{cyzInfo?.ctzCoveragePrice}</Td>
                                  </Tr>
                                  <Tr>
                                      <Td><b>Mano de obra: </b></Td>
                                      <Td></Td>
                                      <Td>{cyzInfo?.ctzWhPrice}</Td>
                                  </Tr>
                                  <Tr>
                                      <Td><b>Gastos indirectos: </b></Td>
                                      <Td></Td>
                                      <Td>{cyzInfo?.ctzIndirectExpenses}</Td>
                                  </Tr>
                                  <Tr>
                                      <Td><b>Ganancia: </b></Td>
                                      <Td></Td>
                                      <Td>{cyzInfo?.ctzEarn}</Td>
                                  </Tr>
                                  <Tr>
                                      <Td><b>Extras: </b></Td>
                                      <Td>{
                                          ctzExtra && ctzExtra.map((extra) => (
                                              <Text key={extra.id}>{extra.name}</Text>
                                          ))
                                      }</Td>
                                      <Td>{cyzInfo?.ctzExtraPrice}</Td>
                                  </Tr>
                                  <Tr>
                                      <Td><b>Total: </b></Td>
                                      <Td>
                                          {cyzInfo?.ctzTotalPrice}
                                      </Td>
                                      <Td>
                                          {cyzInfo?.ctzRoundedAmount} <b>(Redondeado)</b>
                                      </Td>
                                  </Tr>
                              </Tbody>
                          </Table>
                      </TableContainer>
                  )
                }
            </Box>
            <ButtonGroup 
            justifyContent='center' 
            marginInline='auto'
            gap='4' 
            mt={6} 
            >
                <Button 
                colorScheme='blackAlpha'
                variant='outline'
                color='#e80297' 
                bg='white' 
                borderColor='#e80297'
                onClick={handleSaveCtz}
                leftIcon={<FiSave />}
                >
                    Guardar
                </Button>
                <Button 
                bg='#e80297' 
                color='white'
                onClick={handleNext} 
                >
                    Resumen
                </Button>
            </ButtonGroup>
        </Grid>
    </Box>
  )
}

export default Finish