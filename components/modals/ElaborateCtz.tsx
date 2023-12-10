/* eslint-disable react-hooks/exhaustive-deps */
import { CtzGlobalProp } from '@/types/ctz'
import {
    Button,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
  } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'

interface ElaborateCtzProps {
    setShowPopUp: Dispatch<SetStateAction<any>>, 
    actionElaborate: (product: any) => void,
    itemToElaborate: CtzGlobalProp | null
}

const ElaborateCtz:React.FC<ElaborateCtzProps> = ({setShowPopUp, actionElaborate, itemToElaborate}) => {
    const { onClose, onOpen, isOpen } = useDisclosure()
    const cancelRef = useRef(null)
    
    useEffect(() => {
        if(itemToElaborate){
            onOpen()
        } else {
            onClose()
        }
    },[itemToElaborate])

    const handleClose = () => {
        setShowPopUp(null)
        onClose()
    }

    const confirmnElaborate = () => {
      actionElaborate(itemToElaborate)
    }
  return (
    <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={handleClose} 
    >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader 
            fontSize='lg' 
            fontWeight='bold'
            textAlign='center'
            >
              ¿Desaes iniciar elaboración del pedido:<br /> {itemToElaborate?.name}?
            </AlertDialogHeader>

            <AlertDialogFooter w='100%' justifyContent='center'>
              <Button variant='outline' ref={cancelRef} onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant='greenButton' onClick={confirmnElaborate} ml={3}>
                Empezar a realizar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )
}

export default ElaborateCtz
