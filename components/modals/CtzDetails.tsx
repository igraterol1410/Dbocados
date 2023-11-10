/* eslint-disable react-hooks/exhaustive-deps */
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Flex,
    Button,
    Text,
    Grid,
    Box,
    Center,
    Heading,
    useDisclosure,
    TableContainer,
    Table,
    Tbody,
    Tr,
    Td,
    Thead,
    Th,
    ModalHeader,
    ModalFooter,
  } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import useCtzPrice from '@/hooks/useCtzPrice'
import Loader from '../layout/Loader'

const CtzDetails = () => {
    const { ctzToShow } = useCotizadorStateContext()
    const { setCtzToShow } = useCotizadorActionsContext()
    const { onClose, onOpen, isOpen } = useDisclosure()
    const { cyzInfo, loading } = useCtzPrice(ctzToShow?.ctzWorkHand, ctzToShow?.ctzCake, ctzToShow?.ctzCoverage, ctzToShow?.ctzFilling, ctzToShow?.ctzExtra, ctzToShow?.ctzPeople, ctzToShow?.ctzEarn)

    useEffect(() => {
        if(ctzToShow){
            onOpen()
        }
    },[ctzToShow])

    const handleClose = () => {
        setCtzToShow(null)
        onClose()
    }

    return (
        <Modal 
        isCentered 
        size='5xl' 
        isOpen={isOpen} 
        onClose={handleClose} 
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{ctzToShow?.ctzName}</ModalHeader>
            <ModalBody>
                <Box>
                    Porciones: {ctzToShow?.ctzPeople}
                </Box>
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
                                      <Td>{ctzToShow?.ctzPeople}</Td>
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
                                          ctzToShow?.ctzExtra && ctzToShow?.ctzExtra.map((extra:any) => (
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
                <ModalFooter>
                    <Button onClick={handleClose}>Cerrar</Button>
                </ModalFooter>
            </ModalBody>
          </ModalContent>
        </Modal>
    )
}

export default CtzDetails