import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
    Box,
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
    useToast
  } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import { Ingredients } from '@/types/ingredients'
import RecipeDelete from './RecipeDelete'
import { createNewRecipe } from '@/services/recipes'
import { Recipe } from '@/types/recipe'
import Link from 'next/link'

const RecipeDetails = () => {
    const toast = useToast()
    const { recipeToShow, recipes, uid } = useCotizadorStateContext()
    const { setRecipeToShow, setRecipes } = useCotizadorActionsContext()
    const { onClose, onOpen, isOpen } = useDisclosure()
    const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null)

    useEffect(() => {
        if(recipeToShow){
            onOpen()
        }
    },[recipeToShow])

    const handleClose = () => {
        setRecipeToDelete(null)
        setRecipeToShow(null)
        onClose()
    }

    const handleDeleteRecipe = () => {
        if(recipeToDelete){
            const index = recipes.indexOf(recipeToDelete)
            const newArray = [...recipes]
            newArray.splice(index, 1)
            createNewRecipe(newArray, uid).then(() => {
                setRecipes(newArray)
                toast({ status: 'success', description: 'Receta eliminada' })
                handleClose()
            })
        }
    }
    
    return (
        <>
            <RecipeDelete
            setShowPopUp={setRecipeToDelete}
            actionDelete={handleDeleteRecipe}
            itemToDelete={recipeToDelete}
            />
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
                    <ModalFooter gap={4}>
                        <Button onClick={handleClose}>Cerrar</Button>
                        <Link href={`cotizador/editar-receta/${recipeToShow?.id}`}>
                            <Button onClick={handleClose} variant='outline'>
                                Editar
                            </Button>
                        </Link>
                        <Button variant='outline' onClick={() => setRecipeToDelete(recipeToShow)}>Eliminar</Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
            </Modal>
        </>
    )
}

export default RecipeDetails