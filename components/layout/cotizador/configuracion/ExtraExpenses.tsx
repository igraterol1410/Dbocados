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
  Spinner
} from '@chakra-ui/react'
import { Formik,Form,Field, FormikErrors } from 'formik'
import { AiOutlinePlus } from 'react-icons/ai'
import { currencyFormatter } from '@/functions/financeFunctions'
import useUserInfo from '@/hooks/useUserInfo'
import { setExtraExpenses } from '@/services/ingredientList'
import useGetExpenses from '@/hooks/useGetExpenses'
import { Expenses, ExpensesError } from '@/types/extraExpenses'

interface SetupProps {
    setShowList: React.Dispatch<SetStateAction<number>>,
    showList: number
}

const ExtraExpenses:React.FC<SetupProps> = ({setShowList, showList}) => {
    const { uid } = useUserInfo()
    const { extraExpenses, loading } = useGetExpenses()
    const [productList, setProductList] = useState<Expenses[]>([])
    
    useEffect(() => {
        if(extraExpenses){
            setProductList(extraExpenses)
        }
    }, [extraExpenses])

    const handleSaveIngredientsList = () => {
        const currentIngredients = productList
        setExtraExpenses(currentIngredients, uid).then(() => {
            setShowList(showList + 1)
        })
    }
    const setProducts = (values: Expenses) => {
        const arrayUpdated = [...productList, {
            id: productList.length + 1,
            name: values.name,
            price: values.price
        }]
        setProductList(arrayUpdated)
    }

    const handleRemoveProduct = (product:Expenses) => {
        const index = productList.indexOf(product)
        const newArray = [...productList]
        newArray.splice(index, 1)
        setProductList(newArray)
    }

    const isDuplicated = (name:string | null) => {
        const valueDuplicated = productList.filter((eachProduct) => eachProduct.name?.toLocaleLowerCase() === name?.toLocaleLowerCase())
        return valueDuplicated.length > 0
    }

  return (
    <Center marginTop={6}>
        {
            loading &&
            <Spinner/>
        }
        <Box w={['100%','100%','80%' ,'80%']} bg='white' px={[3, 5]} py={[2, 4]} borderRadius={8}>           
            <Box w='100%'>
                <Center mb={4}>
                    <Text fontSize='2xl'>Agrega aquí tu gastos indirectos</Text>
                </Center>
                <Grid
                gridTemplateColumns='1fr 80px 80px'
                gap={4}
                w='100%' 
                py={2} 
                px={4}
                bg='#e80297' 
                color='white' 
                marginBottom={2}
                borderRadius={8}>
                    <GridItem>Ingrediente</GridItem>
                    <GridItem textAlign='right'>Precio</GridItem>
                    <GridItem textAlign='center'>Acción</GridItem>
                </Grid>
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
                        border='1px solid #e80297'
                        color='#e80297' 
                        marginBottom={2}
                        borderRadius={8}>
                            <GridItem>
                                {product.name}
                            </GridItem>
                            <GridItem textAlign='right'>
                                {currencyFormatter(product.price)}
                            </GridItem>
                            <GridItem
                            bg='#e80297' 
                            color='white'
                            borderRadius={8}
                            _hover={{
                                cursor:'pointer',
                                bg:'white',
                                color:'#e80297'
                            }}
                            onClick={() => handleRemoveProduct(product)}>
                                <Center px={3}>
                                    Eliminar
                                </Center>
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
                        border='1px solid #e80297'
                        color='#e80297' 
                        marginBottom={2}
                        borderRadius={8}>
                            <GridItem>
                               Añade ingredientes
                            </GridItem>
                        </Grid>
                }
            </Box>
            <Formik
            initialValues={{
                id: 0,
                name:'',
                price: 0
            }}
            validate={(values)=>{
                const errors: FormikErrors<ExpensesError> = {}
                if(isDuplicated(values.name)){
                    errors.name = 'Ingrediente duplicado'
                }
                return errors
            }}
            onSubmit={(values, actions) => {
                setProducts(values)
                actions.resetForm()
            }}
            >
                {({values,errors,touched})=>(
                    <Form>
                        <Grid w='100%' templateColumns={['1fr', '1fr 80px 80px']} gap={4} alignItems='center' justifyContent='center' mb={6}>
                            <GridItem position='relative'>
                                <FormLabel>Ingrediente</FormLabel>
                                <Field 
                                as={Input}
                                focusBorderColor='#e80297'
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
                                <FormLabel>Precio</FormLabel>
                                <Field 
                                as={Input}
                                focusBorderColor='#e80297'
                                type='number'
                                name='price'
                                placeholder='0'
                                />  
                            </GridItem>
                            <GridItem alignSelf='end'>
                                <Button
                                type='submit'
                                bg='#e80297' 
                                color='white'
                                fontSize={22}
                                w='100%' 
                                marginTop={4}
                                _hover={{
                                    bg:'#17a6bf'
                                }}
                                isDisabled={
                                    !values.name || 
                                    !values.price
                                }
                                >
                                    <AiOutlinePlus />
                                </Button> 
                            </GridItem>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <Button 
            bg='#e80297' 
            color='white'  
            w='100%' 
            marginTop={4}
            _hover={{
                bg:'#17a6bf'
            }}
            disabled={productList.length < 1}
            onClick={handleSaveIngredientsList}
            >
                Guardar cambios
            </Button>                        
        </Box>
    </Center>
  )
}

export default ExtraExpenses
