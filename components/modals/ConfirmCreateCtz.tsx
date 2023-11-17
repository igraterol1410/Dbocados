/* eslint-disable react-hooks/exhaustive-deps */
import { useCtzActionsContext, useCtzStateContext } from '@/context/CotizacionContext'
import { useCotizadorActionsContext } from '@/context/CotizadorGlobalContext'
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
    FormControl,
    Input,
    FormLabel,
    ButtonGroup,
    ModalHeader,
    ModalFooter,
  } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { FiSave } from 'react-icons/fi'

const ConfirmCreateCtz = ({showPopUp, setShowPopUp, createCtz}:{showPopUp:boolean, setShowPopUp:Dispatch<SetStateAction<boolean>>, createCtz:() => void}) => {
    const { onClose, onOpen, isOpen } = useDisclosure()
    const { setCtzName } = useCtzActionsContext()
    const { ctzName } = useCtzStateContext()

    useEffect(() => {
        if(showPopUp){
            onOpen()
        } else {
            onClose()
        }
    },[showPopUp])

    const handleClose = () => {
        setShowPopUp(false)
        onClose()
    }

    const handleRecipeName = (value:string) => {
        setCtzName(value)
    }

    return (
        <Modal 
        isCentered  
        isOpen={isOpen} 
        onClose={handleClose} 
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign='center'>Guarda tu Cotización</ModalHeader>
            <ModalBody>
                <Box>
                <FormControl>
                    <FormLabel>Ingresa un nombre de referencia para esta Cotización</FormLabel>
                    <Input 
                    placeholder='Ingresa un nombre' 
                    value={ctzName}
                    onChange={(e) => handleRecipeName(e.target.value)} 
                    />
                </FormControl>
                </Box>
            </ModalBody>
            <ModalFooter>
                <ButtonGroup 
                gap='4' 
                mt={6} 
                >
                    <Button 
                    colorScheme='blackAlpha'
                    variant='outline'
                    color='pinkPrimary' 
                    bg='white' 
                    borderColor='pinkPrimary'
                    onClick={handleClose} 
                    >
                        Descartar
                    </Button>
                    <Button 
                    bg='pinkPrimary' 
                    color='white'
                    onClick={createCtz}
                    leftIcon={<FiSave />}
                    >
                        Guardar
                    </Button>
                </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default ConfirmCreateCtz