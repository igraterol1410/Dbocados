import React, { useEffect, useState } from 'react'
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
  Spinner,
  Select
} from '@chakra-ui/react'
import { Formik,Form,Field, FormikErrors } from 'formik'
import { Ingredients, IngredientsError } from '@/types/ingredients'
import { AiOutlinePlusCircle, AiOutlinePlus } from 'react-icons/ai'
import { currencyFormatter } from '@/functions/financeFunctions'
import { RecipeIngredient, RecipeIngredientError } from '@/types/recipe'

const CreateReceta = () => {
    const toast = useToast()
    const [productList, setProductList] = useState<RecipeIngredient[]>([])    
    const [ingredients, setIngredients] = useState<Ingredients[]>([])    
    const [disabledButton, setDisabledButton] = useState<boolean>(true)    
    const [refresh, setRefresh] = useState<boolean>(true)    
    const [loading, setLoading] = useState<boolean>(false)   
    const savedValue:string | null =  window.localStorage.getItem('recipe') || '[]'
    const recipe = JSON.parse(savedValue)
    const savedIngredients:string | null =  window.localStorage.getItem('requirement') || ''
    const ingredientsList = JSON.parse(savedIngredients)
    const unidades = ['lt', 'ml', 'kg', 'gr', 'cda', 'cdta', 'unidades']

    useEffect(()=>{
        if(recipe){
            setProductList(recipe)
        }else{
            setProductList([])
        }
    },[refresh])
    useEffect(()=>{
        if(ingredientsList){
            setIngredients(ingredientsList)
        }else{
            setIngredients([])
        }
    },[refresh])

    const handleSubmit = (values:Ingredients) => {
        console.log(values)
        // setLoading(true)
        // setDisabledButton(true)
        // const sendrecipe ={
        //     name: values.name,
        //     email:values.email,
        //     phone:values.phoneNumber
        // }
    }
    const setProducts = (values: RecipeIngredient) => {
        if(isDuplicated(values.name)){
            toast({ status: 'error', description: 'Ingrediente duplicado' })
        }
        else {
            const arrayUpdated = [...productList, {
                name: values.name,
                unity: values.unity,
                amount: values.amount
            }]
            setProductList(arrayUpdated)
            window.localStorage.setItem('recipe', JSON.stringify(arrayUpdated))
        }
    }

    const handleRemoveProduct = (product:RecipeIngredient) => {
        const index = productList.indexOf(product)
        const newArray = [...productList]
        newArray.splice(index, 1)
        window.localStorage.setItem('recipe', JSON.stringify(newArray))
        setProductList(newArray)
    }

    const isDuplicated = (name:string | null) => {
        const valueDuplicated = productList.filter((eachProduct) => eachProduct.name?.toLocaleLowerCase() === name?.toLocaleLowerCase())
        return valueDuplicated.length > 0
    }

  return (
    <Center>
        {
            loading &&
            <Spinner/>
        }
        <Box w={['100%','100%','80%' ,'80%']} bg='white' px={[3, 5]} py={[2, 4]} borderRadius={8}>           
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
                bg='#e80297' 
                color='white' 
                marginBottom={2}
                borderRadius={8}>
                    <GridItem>Ingrediente</GridItem>
                    <GridItem textAlign='center'>Cantidad</GridItem>
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
                            <GridItem textAlign='center'>
                                {`${product.amount}${product.unity}`}
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
                name:'',
                unity:'',
                amount:0
            }}
            validate={(values)=>{
                const errors: FormikErrors<RecipeIngredientError> = {}
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
                        <Grid w='100%' templateColumns={['1fr', '1fr 80px 80px 40px']} gap={4} alignItems='center' justifyContent='center' mb={6}>
                            <GridItem position='relative'>
                                <FormLabel>Ingrediente</FormLabel>
                                <Field 
                                as={Select}
                                focusBorderColor='#e80297'
                                type='text'
                                name='name'
                                placeholder='Nombre del Ingrediente'
                                >
                                    {
                                        ingredientsList && ingredientsList.map((ingrediente:any, index:number) => (
                                            <option value={ingrediente.name} key={index}>{ingrediente.name}</option>
                                        ))
                                    }
                                </Field> 
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
                                focusBorderColor='#e80297'
                                type='number'
                                name='amount'
                                placeholder='0'
                                />
                            </GridItem>
                            <GridItem>
                                <FormLabel>Unidad</FormLabel>
                                <Field 
                                as={Select}
                                focusBorderColor='#e80297'
                                type='number'
                                name='unity'
                                placeholder='selecciona'
                                >
                                    {
                                        unidades.map((unidad, index) => (
                                            <option key={unidad}>{unidad}</option>
                                        ))
                                    }
                                </Field>  
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
                                    !values.amount || 
                                    !values.name || 
                                    !values.unity
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
            disabled={disabledButton}
            >
                Guardar cambios
            </Button>                        
        </Box>
    </Center>
  )
}

export default CreateReceta