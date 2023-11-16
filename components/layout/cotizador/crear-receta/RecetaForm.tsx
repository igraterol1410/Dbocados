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
  Select
} from '@chakra-ui/react'
import { Formik,Form,Field, FormikErrors } from 'formik'
import { Ingredients } from '@/types/ingredients'
import { AiOutlinePlus } from 'react-icons/ai'
import { RecipeIngredient, RecipeIngredientError } from '@/types/recipe'
import { INGREDIENT_UNIT } from '@/constant/unities'
import { useRecipeActionsContext, useRecipeStateContext } from '@/context/RecipeContext'
import useGetRecipes from '@/hooks/useGetRecipes'
import RecetaFormProduct from './RecetaFormProduct'
import Loader from '../../Loader'
import { createNewRecipe } from '@/services/recipes'
import {v4 as uuidv4} from 'uuid'
import { useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import { useRouter } from 'next/router'

const CreateReceta = () => {
    const toast = useToast()    
    const router = useRouter()
    const {setProgress} = useRecipeActionsContext()
    const { ingredients, ctzUser, uid, ingredientsLoading } = useCotizadorStateContext()
    const {progress, recipeName, recipeType, recipePeople} = useRecipeStateContext()
    const [productList, setProductList] = useState<RecipeIngredient[]>([])    
    const [ingredientsList, setIngredientsList] = useState<Ingredients[]>([])    
    const [unitList, setUnitList] = useState<any>([])
    const { recipes } = useGetRecipes()

    useEffect(()=>{
        if(ingredients){
            setIngredientsList(ingredients)
        }
    },[ingredients])
    
    useEffect(()=>{
        if(router.query.rid && recipes){
            const recipeData = recipes.filter((eachRecipe) => (eachRecipe.id === router.query.rid))
            if(recipeData.length > 0 && recipeData[0]?.recipeName){
                setProductList(recipeData[0]?.recipeIngredients)
            }
        }
    },[router.query.rid, recipes])

    const getIngredientInfo = (ingredient:string | null) => {
        const ingredientInfo = ingredients.filter((eachIngredient) => (eachIngredient.name === ingredient))

        return ingredientInfo[0].id
    }

    const setProducts = (values: RecipeIngredient) => {
        if(isDuplicated(values.name)){
            toast({ status: 'error', description: 'Ingrediente duplicado' })
        }
        else {
            const arrayUpdated = [...productList, {
                name: values.name,
                unity: values.unity,
                amount: values.amount,
                productRef: getIngredientInfo(values.name)
            }]
            setProductList(arrayUpdated)
        }
    }

    const handleRemoveProduct = (product:RecipeIngredient) => {
        const index = productList.indexOf(product)
        const newArray = [...productList]
        newArray.splice(index, 1)
        setProductList(newArray)
    }

    const isDuplicated = (name:string | null) => {
        const valueDuplicated = productList.filter((eachProduct) => eachProduct.name?.toLocaleLowerCase() === name?.toLocaleLowerCase())
        return valueDuplicated.length > 0
    }

    const getUnits = (name:string) => {
        const units = []
        const unitsPossibles = ingredientsList.filter((eachIngredient:Ingredients) => (eachIngredient.name === name))
        units.push(unitsPossibles[0]?.unity)
        const unitConversion = INGREDIENT_UNIT.filter((eachUnit) => (eachUnit.unit === unitsPossibles[0]?.unity))
        units.push(unitConversion[0]?.alternative_conversion.unit)
        setUnitList(units)
    }

    const handleSaveRecipe = () => {
        if(ctzUser){
            if(router.query.rid){
                const editedRecipe = recipes.map((eachRecipe) => (
                    {
                        id: eachRecipe.id,
                        recipeName: router.query.rid === eachRecipe.id ? recipeName : eachRecipe.recipeName,
                        recipeType: router.query.rid === eachRecipe.id ? recipeType : eachRecipe.recipeType,
                        recipePeople: router.query.rid === eachRecipe.id ? recipePeople : eachRecipe.recipePeople,
                        recipeIngredients: router.query.rid === eachRecipe.id ? productList : eachRecipe.recipeIngredients
                    }
                ))
                const payload = editedRecipe
                createNewRecipe(payload, uid).then(() => {
                    setProgress(progress + 1)
                })
            } else {
                const newRecipe = {
                    id: uuidv4(),
                    recipeName: recipeName,
                    recipeType: recipeType,
                    recipePeople: recipePeople,
                    recipeIngredients: productList
                }
                const payload = [...recipes, newRecipe]
                createNewRecipe(payload, uid).then(() => {
                    setProgress(progress + 1)
                })
            }
        } else {
            toast({ status: 'error', description: 'No puedes realizar esta acción' })
            setTimeout(() => {
                window.location.reload()                
            }, 2000);
        }
    }

  return (
    <Center>
        {
            ingredientsLoading &&
            <Loader/>
        }
        <Box w={['100%','100%','90%' ,'90%']} bg='white' px={[3, 5]} py={[2, 4]} borderRadius={8}>           
            <Box w='100%'>
                <Center mb={4}>
                    <Text fontSize='2xl'>Lista de Ingredientes</Text>
                </Center>
                <Grid
                gridTemplateColumns='1fr 100px 100px'
                gap={4}
                w='100%' 
                py={2} 
                px={4}
                bg='pinkPrimary' 
                color='white' 
                marginBottom={2}
                borderRadius={8}>
                    <GridItem>Ingrediente</GridItem>
                    <GridItem textAlign='center'>Cantidad</GridItem>
                    <GridItem textAlign='center'>Acción</GridItem>
                </Grid>
                {
                    productList.length > 0 
                    ? (
                        productList.map((product, index)=>(
                            <RecetaFormProduct 
                            key={index}
                            product={product} 
                            handleRemoveProduct={handleRemoveProduct} 
                            />
                        ))                        
                    )
                    : (
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
                    )
                }
            </Box>
            <Formik
            initialValues={{
                name:'',
                unity:'',
                amount:0,
                productRef: 0
            }}
            validate={(values)=>{
                const errors: FormikErrors<RecipeIngredientError> = {}
                getUnits(values.name)
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
                                focusBorderColor='pinkPrimary'
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
                                disabled={!values.name}
                                >
                                    {
                                        unitList && unitList.map((unit:any, index:number) => (
                                            <option key={index}>{unit}</option>
                                        ))
                                    }
                                </Field>  
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
            bg='pinkPrimary' 
            color='white'  
            w='100%' 
            marginTop={4}
            _hover={{
                bg:'pink.400'
            }}
            isDisabled={productList.length < 1}
            onClick={handleSaveRecipe}
            >
                Guardar receta
            </Button>                        
        </Box>
    </Center>
  )
}

export default CreateReceta