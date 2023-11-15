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
  Spinner
} from '@chakra-ui/react'
import { Formik,Form,Field, FormikErrors } from 'formik'
import { AiOutlinePlus } from 'react-icons/ai'
import { currencyFormatter } from '@/functions/financeFunctions'
import useUserInfo from '@/hooks/useUserInfo'
import { Expenses, ExpensesError } from '@/types/extraExpenses'
import { useCtzActionsContext, useCtzStateContext } from '@/context/CotizacionContext'

const Extras = () => {
  const { progress, ctzExtra } = useCtzStateContext()
  const { setProgress, setCtzExtra } = useCtzActionsContext()
  const [productList, setProductList] = useState<Expenses[]>([])
  
  useEffect(() => {
      if(ctzExtra){
          setProductList(ctzExtra)
      }
  }, [])

  const handleSaveIngredientsList = () => {
      setCtzExtra(productList)
      setProgress(progress + 1)
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
      <Box 
      w={['100%','100%','90%' ,'90%']} 
      bg='white' 
      px={[3, 5]} 
      py={[2, 4]} 
      borderRadius={8} 
      marginInline='auto'
      display='grid'
      gridTemplateRows={['1fr auto']}
      > 
        <Box>
          <Box w='100%'>
              <Center mb={4}>
                  <Text fontSize='2xl' fontWeight='bold'>Agrega aquí los extras de tu pedido</Text>
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
                  <GridItem>Extra</GridItem>
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
                      border='1px solid #BA346E'
                      color='pinkPrimary' 
                      marginBottom={2}
                      borderRadius={8}>
                          <GridItem>
                              {product.name}
                          </GridItem>
                          <GridItem textAlign='right'>
                              {currencyFormatter(product.price)}
                          </GridItem>
                          <GridItem
                          bg='pinkPrimary' 
                          color='white'
                          borderRadius={8}
                          _hover={{
                              cursor:'pointer',
                              bg:'white',
                              color:'pinkPrimary'
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
                      border='1px solid #BA346E'
                      color='pinkPrimary' 
                      marginBottom={2}
                      borderRadius={8}>
                          <GridItem>
                             Añade productos extra
                          </GridItem>
                      </Grid>
              }
          </Box>
          <Formik
          initialValues={{
              id:0,
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
                              <FormLabel>Producto</FormLabel>
                              <Field 
                              as={Input}
                              focusBorderColor='pinkPrimary'
                              type='text'
                              name='name'
                              placeholder='Nombre del Producto'
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
        </Box>          
          <Button 
          bg='pinkPrimary' 
          color='white'  
          w='100%' 
          marginTop={4}
          _hover={{
              bg:'pink.400'
          }}
          disabled={productList.length < 1}
          onClick={handleSaveIngredientsList}
          >
              Guardar cambios
          </Button>                        
      </Box>
)
}

export default Extras
