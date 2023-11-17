import React, { SetStateAction, useEffect, useState } from 'react'
import {
  Box,
  Center,
  Input,
  Grid, 
  GridItem,
  Button,
  FormLabel,
  Text,
  useToast,
  Select
} from '@chakra-ui/react'
import { Formik,Form,Field, FormikErrors } from 'formik'
import { Ingredients, IngredientsError } from '@/types/ingredients'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import { currencyFormatter } from '@/functions/financeFunctions'
import { INGREDIENT_UNIT } from '@/constant/unities'
import { createIngredientsList } from '@/services/ingredientList'
import useGetIngredients from '@/hooks/useGetIngredients'
import {v4 as uuidv4} from 'uuid'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import Loader from '../../Loader'
import { updateUser } from '@/services/users'
import { FaPlus } from 'react-icons/fa'
import AlertDelete from '@/components/modals/AlertDelete'

interface SetupProps {
    setShowList: React.Dispatch<SetStateAction<number>>,
    showList: number
}

const SetupCotizador:React.FC<SetupProps> = ({setShowList, showList}) => {
    const toast = useToast()
    const initivialValuesRef = {
        id: 0,
        name:'',
        unity:'',
        amount:0,
        price: 0
    }
    const { ingredients: currentIngredients, loading: ingredientsLoading } = useGetIngredients()
    const { ingredients, uid, ctzUser, userInfo } = useCotizadorStateContext()
    const { setIngredients, setGlobalUser } = useCotizadorActionsContext()
    const [productList, setProductList] = useState<Ingredients[]>([])    
    const [editProduct, setEditProduct] = useState<number | null>(null)    
    const [itemToDelete, setItemToDelete] = useState<Ingredients | null>(null)    
    const [initialValues, setInitialValues] = useState<Ingredients>(initivialValuesRef)    
    const [disabledButton, setDisabledButton] = useState<boolean>(true) 
    console.log(userInfo) 
    
    useEffect(() => {
        if(currentIngredients.length !== ingredients.length){
            setProductList(currentIngredients)
            setIngredients(currentIngredients)
        }
    }, [currentIngredients])

    const handleSaveIngredientsList = () => {
        if(ctzUser){
            const currentIngredients = productList
            createIngredientsList(currentIngredients, uid).then(() => {
                const payload = {...userInfo, hasIngredients: true}
                updateUser(payload, uid).then(() => {
                    setIngredients(currentIngredients)
                    setGlobalUser(payload)
                    setShowList(showList + 1)
                })
            })
        } else {
            toast({ status: 'error', description: 'No puedes realizar esta acción' })
            setTimeout(() => {
                window.location.reload()                
            }, 2000);
        }
    }
    const setProducts = (values: Ingredients) => {
        if(editProduct !== null){
            const updatedArray = productList.map((eachProduct) => (
                {
                    id: eachProduct.id,
                    name: eachProduct.id === productList[editProduct].id ? values.name : eachProduct.name,
                    unity: eachProduct.id === productList[editProduct].id ? values.unity : eachProduct.unity,
                    amount: eachProduct.id === productList[editProduct].id ? values.amount : eachProduct.amount,
                    price: eachProduct.id === productList[editProduct].id ? values.price : eachProduct.price
                }
            ))
            setProductList(updatedArray)
            setInitialValues(initivialValuesRef)
            setEditProduct(null)
        } else {
            const arrayUpdated = [...productList, {
                id: uuidv4(),
                name: values.name,
                unity: values.unity,
                amount: values.amount,
                price: values.price
            }]
            setProductList(arrayUpdated)
        }
    }

    const handleEditProduct = (product:Ingredients) => {
        const index = productList.indexOf(product)
        setInitialValues({
            id: productList[index].id,
            name:productList[index].name,
            unity:productList[index].unity,
            amount:productList[index].amount,
            price: productList[index].price
        })
        setEditProduct(index)
        // const newArray = [...productList]
        // newArray.splice(index, 1)
        // setProductList(newArray)
    }

    const handleRemoveProduct = (product:Ingredients) => {
        const index = productList.indexOf(product)
        const newArray = [...productList]
        newArray.splice(index, 1)
        setProductList(newArray)
        setItemToDelete(null)
    }

    const isDuplicated = (name:string | null) => {
        const valueDuplicated = productList.filter((eachProduct) => eachProduct.name?.toLocaleLowerCase() === name?.toLocaleLowerCase())
        return valueDuplicated.length > 0
    }

  return (
    <Center marginTop={6} position='relative'>
        <Box 
        w={['100%','100%','90%' ,'90%']} 
        bg='white' 
        px={[3, 5]} 
        py={[2, 4]} 
        borderRadius={8}
        shadow='xl'
        >           
            <Box w='100%'>
                <Center mb={4}>
                    <Text fontSize='2xl'>Lista de Ingredientes</Text>
                </Center>
                <Grid
                gridTemplateColumns='1fr 80px 80px'
                gap={4}
                w='100%' 
                py={2} 
                px={4}
                bg='pinkPrimary' 
                color='white' 
                marginBottom={2}
                borderRadius={8}>
                    <GridItem>Ingrediente</GridItem>
                    <GridItem textAlign='right'>Precio</GridItem>
                    <GridItem textAlign='center'>Acción</GridItem>
                </Grid>
                {
                    ingredientsLoading 
                    ? (
                        <Loader />
                    )
                    : (
                        <>
                {
                    productList && productList.map((product, index)=>(
                        <Grid 
                        key={index}
                        gridTemplateColumns='1fr 80px 80px'
                        fontSize={['14px', '16px']}
                        gap={4}
                        alignContent='center'
                        alignItems='center'
                        w='100%' 
                        py={2} 
                        px={4}
                        border='1px solid #BA346E'
                        color='pinkPrimary' 
                        marginBottom={2}
                        borderRadius={8}>
                            <GridItem>
                                {product.name} {`(${product.amount}${product.unity})`}
                            </GridItem>
                            <GridItem textAlign='right'>
                                {currencyFormatter(product.price)}
                            </GridItem>
                            <GridItem
                            borderRadius={8}
                            display='flex'
                            justifyContent='space-around'
                            _hover={{
                                cursor:'pointer',
                                bg:'white',
                                color:'pinkPrimary'
                            }}
                            >
                                    <Box 
                                    bg='pinkPrimary' 
                                    color='white' 
                                    borderRadius={8}
                                    p={2}
                                    onClick={() => handleEditProduct(product)}
                                    >
                                        <AiOutlineEdit />
                                    </Box>
                                    <Box                                    
                                    bg='pinkPrimary' 
                                    color='white' 
                                    borderRadius={8}
                                    p={2}
                                    onClick={() => setItemToDelete(product)}
                                    >
                                        <AiOutlineDelete />
                                    </Box>
                            </GridItem>
                        </Grid>
                    ))
                }
                {
                    productList.length === 0 &&
                    <Grid 
                        gridTemplateColumns='1fr'
                        w='100%' 
                        py={2} 
                        px={4}
                        border='1px solid #BA346E'
                        color='pinkPrimary' 
                        marginBottom={2}
                        borderRadius={8}>
                            <GridItem>
                            Añade ingredientes
                            </GridItem>
                        </Grid>
                }
                        </>
                    )
                }
            </Box>
            <Formik
            initialValues={initialValues}
            validate={(values)=>{
                const errors: FormikErrors<IngredientsError> = {}
                if(isDuplicated(values.name) && editProduct === null){
                    errors.name = 'Ingrediente duplicado'
                }
                return errors
            }}
            onSubmit={(values, actions) => {
                setProducts(values)
                actions.resetForm()
            }}
            enableReinitialize
            >
                {({values,errors,touched})=>(
                    <Form>
                        <Grid w='100%' templateColumns={['1fr', '1fr 80px 80px 80px 40px']} gap={4} alignItems='center' justifyContent='center' mb={6}>
                            <GridItem position='relative'>
                                <FormLabel>Ingrediente</FormLabel>
                                <Field 
                                as={Input}
                                focusBorderColor='pinkPrimary'
                                type='text'
                                name='name'
                                placeholder='Nombre del Ingrediente'
                                /> 
                                {
                                    errors.name && touched.name &&
                                    <Text 
                                    position='absolute' 
                                    bottom={-6} 
                                    left={2}
                                    color='red'
                                    >
                                        {errors.name}
                                    </Text>
                                } 
                            </GridItem>
                            <GridItem>
                                <FormLabel>Cantidad</FormLabel>
                                <Field 
                                as={Input}
                                focusBorderColor='pinkPrimary'
                                type='number'
                                name='amount'
                                placeholder='0'
                                />
                            </GridItem>
                            <GridItem>
                                <FormLabel>Unidad</FormLabel>
                                <Field 
                                as={Select}
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
                            </GridItem>
                            <GridItem>
                                <FormLabel>Precio</FormLabel>
                                <Field 
                                as={Input}
                                focusBorderColor='pinkPrimary'
                                type='number'
                                name='price'
                                placeholder='0'
                                />  
                            </GridItem>
                            <GridItem alignSelf='end'>
                                <Button
                                type='submit'
                                bg='pinkPrimary' 
                                color='white'
                                fontSize={22}
                                w='100%' 
                                marginTop={4}
                                _hover={{
                                    bg:'pink.400'
                                }}
                                isDisabled={
                                    !values.amount || 
                                    !values.name || 
                                    !values.price || 
                                    !values.unity
                                }
                                >
                                    <FaPlus />
                                </Button> 
                            </GridItem>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <Button 
            bg='pinkPrimary' 
            color='white'  
            w='100%' 
            marginTop={4}
            _hover={{
                bg:'pink.400'
            }}
            disabled={disabledButton}
            onClick={handleSaveIngredientsList}
            >
                Guardar cambios
            </Button>                        
        </Box>
    </Center>
  )
}

export default SetupCotizador