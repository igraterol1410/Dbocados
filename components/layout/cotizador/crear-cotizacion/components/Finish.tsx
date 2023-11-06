/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Flex, Grid, Heading, Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import React, {useEffect} from 'react'
import { useCtzActionsContext, useCtzStateContext } from '@/context/CotizacionContext'
import useCtzPrice from '@/hooks/useCtzPrice'
import Loader from '@/components/layout/Loader'
import FiSave from 'react-icons/fi'

const Finish = () => {
  const { ctzWorkHand, progress, ctzCake, ctzCoverage, ctzFilling, ctzExtra, ctzPeople, ctzEarn } = useCtzStateContext()
  const { setProgress, setCtzInfo } = useCtzActionsContext()
  const { cyzInfo, loading } = useCtzPrice(ctzWorkHand, ctzCake, ctzCoverage, ctzFilling, ctzExtra, ctzPeople, ctzEarn)

  useEffect(() => {
    if(cyzInfo){
        setCtzInfo(cyzInfo)
    }
  },[cyzInfo])

  const handleNext = () => {
    setProgress(progress + 1)
  }

  return (
    <Box h='100%' w='full' bg='#fcfcfc' borderRadius={[8, 12]} p={6}>
          <Grid 
          templateRows={['1fr auto']}
          alignItems='center'
          gap={6}
          >
              <Flex direction='column' h='100%' justifyContent='space-between'>
                  <Box
                  w={['85%', '80%']}
                  marginInline='auto'
                  textAlign='center'
                  >
                      <Heading as='h3' mb={6}>
                          Resumen de tu pedido
                      </Heading>
                      {
                        loading 
                        ? (
                            <Loader />
                        )
                        : (
                            <TableContainer>
                                <Table variant='simple' overflowY='scroll'>
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
                    <ButtonGroup justifyContent='center' gap='4'>
                        <Button 
                        colorScheme='blackAlpha'
                        variant='outline'
                        color='#e80297' 
                        bg='white' 
                        borderColor='#e80297'
                        leftIcon={<FiSave />}
                        >
                            BlackAlpha
                        </Button>
                        <Button 
                        bg='#e80297' 
                        color='white' 
                        >
                            BlackAlpha
                        </Button>
                    </ButtonGroup>
              </Flex>
          </Grid>
      </Box>
  )
}

export default Finish