/* eslint-disable react-hooks/exhaustive-deps */
import { Ingredients } from '@/types/ingredients'
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

interface AlertDeleteProps {
    setShowPopUp: Dispatch<SetStateAction<any>>, 
    actionDelete: (product: any) => void,
    itemToDelete: Ingredients | null
}

const AlertDelete:React.FC<AlertDeleteProps> = ({setShowPopUp, actionDelete, itemToDelete}) => {
    const { onClose, onOpen, isOpen } = useDisclosure()
    const cancelRef = useRef(null)

    useEffect(() => {
        if(itemToDelete){
            onOpen()
        } else {
            onClose()
        }
    },[itemToDelete])

    const handleClose = () => {
        setShowPopUp(null)
        onClose()
    }

    const confirmnDelete = () => {
      actionDelete(itemToDelete)
    }

    return (
    <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={handleClose} 
    >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Eliminar Ingrediente {itemToDelete?.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Esta acción puede afectar tus recetas y cotizaciones.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={confirmnDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
}

export default AlertDelete