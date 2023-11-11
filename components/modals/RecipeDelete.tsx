/* eslint-disable react-hooks/exhaustive-deps */
import { Recipe } from '@/types/recipe'
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

interface CtzDeleteProps {
    setShowPopUp: Dispatch<SetStateAction<any>>, 
    actionDelete: (product: any) => void,
    itemToDelete: Recipe | null
}

const CtzDelete:React.FC<CtzDeleteProps> = ({setShowPopUp, actionDelete, itemToDelete}) => {
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
              Eliminar receta: {itemToDelete?.recipeName}
            </AlertDialogHeader>

            <AlertDialogBody>
              Esta acción es irreversible y afectará a las cotizaciones que lleven esta receta
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

export default CtzDelete