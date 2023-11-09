import useUserInfo from '@/hooks/useUserInfo'
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
import { Ingredients } from '@/types/ingredients'

const RecipeDetails = () => {
    const { recipeToShow } = useCotizadorStateContext()
    const { setRecipeToShow } = useCotizadorActionsContext()
    const { onClose, onOpen, isOpen } = useDisclosure()

    useEffect(() => {
        if(recipeToShow){
            onOpen()
        }
    },[recipeToShow])

    const handleClose = () => {
        setRecipeToShow(null)
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
            <ModalHeader>{recipeToShow?.recipeType}: {recipeToShow?.recipeName}</ModalHeader>
            <ModalBody>
                <Box>
                    Porciones: {recipeToShow?.recipePeople}
                </Box>
                <TableContainer w={['100%', '80%']} marginInline='auto'>
                    <Table variant='striped' overflowY='scroll'>
                        <Thead>
                            <Tr>
                                <Th textAlign='center'>Ingredientes</Th>
                                <Th textAlign='center'>Cantidad</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                recipeToShow?.recipeIngredients.map((eachIngredient: Ingredients, index:number) => (
                                    <Tr key={index}>
                                        <Td textAlign='center'>{eachIngredient.name}</Td>
                                        <Td textAlign='center'>{eachIngredient.amount}({eachIngredient.unity})</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <ModalFooter>
                    <Button onClick={handleClose}>Cerrar</Button>
                </ModalFooter>
            </ModalBody>
          </ModalContent>
        </Modal>
    )
}

export default RecipeDetails