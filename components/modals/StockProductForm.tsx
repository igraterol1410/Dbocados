import { useStockActionsContext, useStockStateContext } from '@/context/StockContext'
import getBase64 from '@/functions/getBase64'
import { Button, Text, Center, Divider, Flex, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Box, Select, useToast } from '@chakra-ui/react'
import { Field, Form, Formik, FormikErrors } from 'formik'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import NoPicture from '@/assets/product.svg'
import { INGREDIENT_UNIT } from '@/constant/unities'
import { Ingredients, IngredientsError, IngredientsForm } from '@/types/ingredients'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import { createIngredientsList } from '@/services/ingredientList'
import { updateUser } from '@/services/users'
import {v4 as uuidv4} from 'uuid'

const StockProductForm = () => {
    const initivialValuesRef = {
        name: '',
        unity: '',
        amount: 0,
        balance: 0,
        image: '',
        price: 0
    }
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { setIngredients, setGlobalUser } = useCotizadorActionsContext()
    const { ingredients, uid, ctzUser, userInfo } = useCotizadorStateContext()
    const { showProductModal } = useStockStateContext()
    const { setShowProductModal } = useStockActionsContext()
    const [productImage, setProductImage] = useState<string>('')
    const [productImageName, setProductImageName] = useState<string>('')    
    const [initialValues, setInitialValues] = useState<IngredientsForm>(initivialValuesRef)
    const finalRef = useRef(null)    
    const dateNow = new Date()
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e?.target?.files?.[0]){
            getBase64(e?.target?.files[0]).then((img:any) => {
                setProductImageName(e?.target?.files?.[0].name || '')
                setProductImage(img)
            })
        }
    }

    useEffect(() => {
        if(showProductModal){
            onOpen()
        }
    },[showProductModal])

    const handleClose = () => {
        setShowProductModal(false)
        onClose()
    }

    const isDuplicated = (name:string | null) => {
        const valueDuplicated = ingredients.filter((eachIngredient) => eachIngredient.name?.toLocaleLowerCase() === name?.toLocaleLowerCase())
        return valueDuplicated.length > 0
    }

    const handleSaveIngredientsList = (values: IngredientsForm) => {
        if(ctzUser){
            const newIngredient = {
                ...values,
                id: uuidv4(),
                image: productImage,
                created_at: dateNow,
                updated_at: dateNow
            }   
            ingredients.push(newIngredient)
            createIngredientsList(ingredients, uid).then(() => {
                const payload = {...userInfo, hasIngredients: true}
                updateUser(payload, uid).then(() => {
                    setIngredients(ingredients)
                    setGlobalUser(payload)
                    handleClose()
                })
            })
        } else {
            toast({ status: 'error', description: 'No puedes realizar esta acción' })
            setTimeout(() => {
                window.location.reload()                
            }, 2000);
        }
    }
    
  return (
    <Modal 
    isCentered 
    size='5xl' 
    finalFocusRef={finalRef} 
    isOpen={isOpen} 
    onClose={handleClose}
    >
        <ModalOverlay />
        <Formik
          initialValues={initialValues}
          validate={(values)=>{
              const errors: FormikErrors<IngredientsError> = {}
              if(isDuplicated(values.name)){
                  errors.name = 'Ingrediente duplicado'
              }
              return errors
          }}
          onSubmit={(values, actions) => {
              handleSaveIngredientsList(values)
              actions.resetForm()
          }}
          enableReinitialize
          >
            {({errors, touched})=>(
            <Form>
                <ModalContent>
                    <ModalHeader fontWeight={700} fontSize={36}>
                        Producto
                        <Divider />
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <FormLabel
                            position='relative'
                            marginInline='auto'
                            p={3}
                            border='1px solid #D5D5D5'
                            rounded='xl'
                            mb={4}
                            >
                            <Flex
                            justifyContent='space-between'
                            alignItems='center'
                            w='calc((9/10)*250px)'
                            h='250px'
                            >
                                <Box 
                                borderRadius={40} 
                                position='relative' 
                                w={['100px', '500px']}
                                >
                                    <Image
                                    width={500}
                                    height={(9/16)*500}
                                    src={productImage ? productImage : NoPicture}
                                    alt='Logo dbocados'
                                    />
                                    <Text textAlign='center'>
                                        {productImage ? 'Cambia la imagen' : 'Añade una foto'}
                                    </Text>
                                </Box>
                            </Flex>
                            <Input
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleImage(e)}
                                hidden
                            />
                            </FormLabel>
                        </Center>
                        <Grid w='100%' templateColumns={['1fr', '1fr 1fr']} gap={4} alignItems='center' justifyContent='center' mb={6}>
                            <GridItem position='relative'>
                                <FormLabel>Nombre
                                    <Field 
                                    as={Input}
                                    focusBorderColor='#e80297'
                                    type='text'
                                    name='name'
                                    placeholder='Nombre del producto'
                                    /> 
                                </FormLabel>
                                {
                                    errors.name && touched.name &&
                                    <Text 
                                    position='absolute' 
                                    bottom={-3} 
                                    fontSize='xs'
                                    left={2}
                                    color='red'
                                    >
                                        {errors.name}
                                    </Text>
                                }
                            </GridItem>
                            <GridItem>
                                <FormLabel>Precio
                                    <Field 
                                    as={Input}
                                    focusBorderColor='pinkPrimary'
                                    type='number'
                                    name='price'
                                    placeholder='0'
                                    />  
                                </FormLabel>
                            </GridItem>
                            <GridItem position='relative'>
                                <FormLabel>Cantidad
                                    <Field 
                                    as={Input}
                                    focusBorderColor='#e80297'
                                    type='number'
                                    name='amount'
                                    placeholder='Cantidad'
                                    /> 
                                </FormLabel>
                            </GridItem>
                            <GridItem>
                                <FormLabel>Unidad
                                    <Field 
                                    as={Select}
                                    rounded={20}
                                    focusBorderColor='pinkPrimary'
                                    type='number'
                                    name='unity'
                                    placeholder='selecciona'
                                    >
                                        {
                                            INGREDIENT_UNIT.map((unidad, index) => (
                                                <option key={index}>{unidad.unit}</option>
                                            ))
                                        }
                                    </Field>  
                                </FormLabel>
                            </GridItem>
                        </Grid>
                        <Grid 
                        mt={4} 
                        alignItems='end' 
                        gap={4} 
                        templateColumns={['1fr 1fr 1fr']}
                        bg='rgba(0, 0, 0, 0.05)'
                        p={4}
                        borderRadius={20}
                        >
                            <GridItem position='relative'>
                                <FormLabel>Cantidad disponible:</FormLabel>
                                <Field 
                                as={Input}
                                focusBorderColor='#e80297'
                                type='number'
                                name='balance'
                                placeholder='0'
                                /> 
                            </GridItem> 
                            {/* <GridItem position='relative'>
                                <FormLabel>Periodicidad</FormLabel>
                                <Field 
                                as={Input}
                                focusBorderColor='#e80297'
                                type='text'
                                name='new_area'
                                placeholder='Nueva area de trabajo'
                                /> 
                            </GridItem>  */}
                            {/* <GridItem position='relative'>
                                <Flex gap={4} justifyContent='center'>
                                    <Button>Editar</Button>
                                    <Button>Añadir</Button>
                                </Flex>
                            </GridItem>  */}
                        </Grid>
                    </ModalBody>

                    <ModalFooter>
                        <Button  mr={3} variant='outline'>Cancelar</Button>
                        <Button 
                        type='submit'
                        >
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Form>
        )}
        </Formik>
      </Modal>
  )
}

export default StockProductForm
