/* eslint-disable react-hooks/exhaustive-deps */
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
    Text,
    Box,
    useDisclosure,
    TableContainer,
    Table,
    Tbody,
    Tr,
    Td,
    ModalHeader,
    ModalFooter,
    useToast,
  } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import useCtzPrice from '@/hooks/useCtzPrice'
import Loader from '../layout/Loader'
import { CtzGlobalProp } from '@/types/ctz'
import CtzDelete from './CtzDelete'
import { createNewCtz } from '@/services/cotizaciones'
import Link from 'next/link'

const CtzDetails = () => {
    const toast = useToast()
    const { ctzToShow, ctzs, uid } = useCotizadorStateContext()
    const { setCtzToShow, setCtzs } = useCotizadorActionsContext()
    const { onClose, onOpen, isOpen } = useDisclosure()
    const { cyzInfo, loading } = useCtzPrice(ctzToShow?.ctzWorkHand, ctzToShow?.ctzCake, ctzToShow?.ctzCoverage, ctzToShow?.ctzFilling, ctzToShow?.ctzExtra, ctzToShow?.ctzPeople, ctzToShow?.ctzEarn)
    const [ctzToDelete, setCtzToDelete] = useState<CtzGlobalProp | null>(null)

    useEffect(() => {
        if(ctzToShow){
            onOpen()
        }
    },[ctzToShow])

    const handleClose = () => {
        setCtzToDelete(null)
        setCtzToShow(null)
        onClose()
    }

    const handleDeleteCtz = () => {
        if(ctzToDelete){
            const index = ctzs.indexOf(ctzToDelete)
            const newArray = [...ctzs]
            newArray.splice(index, 1)
            createNewCtz(newArray, uid).then(() => {
                setCtzs(newArray)
                toast({ status: 'success', description: 'Cotización eliminada' })
                handleClose()
            })
        }
    }
    
    return (
        <>
        <CtzDelete
        setShowPopUp={setCtzToDelete}
        actionDelete={handleDeleteCtz}
        itemToDelete={ctzToDelete}
        />
            <Modal 
            isCentered 
            size='5xl' 
            isOpen={isOpen} 
            onClose={handleClose} 
            scrollBehavior='inside'
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
                    <ModalFooter gap={4}>
                        <Button onClick={handleClose}>Cerrar</Button>
                        <Link href={`cotizador/editar-cotizacion/${ctzToShow?.id}`}>
                            <Button onClick={handleClose} variant='outline'>
                                Editar
                            </Button>
                        </Link>
                        <Button variant='outline' onClick={() => setCtzToDelete(ctzToShow)}>Eliminar</Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
            </Modal>
        </>
    )
}

export default CtzDetails