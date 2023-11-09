import React, { useEffect, useState } from 'react'
import { Button, Center, Grid, GridItem, Heading, Text, Flex, Box } from '@chakra-ui/react'
import { BiSolidParty } from 'react-icons/bi'
import { Recipe } from '@/types/recipe'
import RecipeCard from '@/components/layout/cotizador/recetas/RecipeCard'
import Link from 'next/link'
import useGetRecipes from '@/hooks/useGetRecipes'
import { AiOutlinePlus } from 'react-icons/ai'
import useGetCtz from '@/hooks/useGetCtz'
import CtzCard from '@/components/layout/cotizador/configuracion/CtzCard'
import { CtzGlobalProp } from '@/types/ctz'
import Image from 'next/image'
import Ilustracion from '@/assets/no-data.svg'
import Loader from '@/components/layout/Loader'
import AddNew from '@/components/layout/cotizador/AddNew'
import { FaPlus, FaReceipt, FaShoppingBag } from 'react-icons/fa'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'

const Cotizador = () => {
  const { recipes: currentRecipes, loading: recipeLoading } = useGetRecipes()  
  const { ctz, loading:  ctzLoading } = useGetCtz()
  const { setCtzs, setRecipes } = useCotizadorActionsContext()
  const { ctzs, recipes } = useCotizadorStateContext()

  useEffect(() => {
    if(ctz){
      setCtzs(ctz)
    }
  }, [ctz])

  useEffect(() => {
    if(currentRecipes){
      setRecipes(currentRecipes)
    }
  }, [currentRecipes])

  return (
    <Flex
    direction='column'
    gap={['32px', '64px']}
    px={[2, 6]}
    py={[2, 6]}
    h='full'
    overflowY='scroll'
    position='relative'
    >
      <Heading as='h2' display='flex' alignItems='center' gap={4} >
        Bienvenido a tu cotizador personal <BiSolidParty />
      </Heading>
      <Grid
      templateRows={['1fr']}
      templateColumns={['1fr', '1fr 1fr']}
      gap={[3, 5]}
      h='100%'
      >
        <GridItem
        borderRadius={[5, 10]}
        px={[3, 5]}
        py={[2, 4]}
        bg='#fcfcfc'
        display='grid'
        gridTemplateRows={['auto 1fr auto']}
        alignItems='center'
        >
          <Text fontWeight='bold' textAlign='center'>
            Tus Cotizaciones
          </Text>
          <Grid templateColumns={['1fr', '1fr']} gap={4} mt={4}>
            {
              ctzLoading
              ? (
                <Box position='relative'>
                  <Loader />
                </Box>
              )
              : (
                <>
                  {
                    ctzs && ctzs.length > 0
                    ? (
                      <Grid templateColumns={['1fr', '1fr']} gap={4} mt={4}>
                        {
                          ctzs.map((eachCtz:CtzGlobalProp, index:number) => (
                            <CtzCard key={index} ctz={eachCtz} />
                          ))
                        }
                      </Grid>
                    )
                    : (
                      <Box>
                        <Center>
                          <Image
                          src={Ilustracion}
                          alt='Empty state'
                          width={100}
                          />
                        </Center>
                        <Center>
                          <Text>Aún no tienes cotizaciones, crea la primera aquí</Text>
                        </Center>
                      </Box>
                    ) 
                  }
                </>
              )
            }
          </Grid>
          <Link href='/cotizador/cotizaciones'>
            <Button 
            variant='outline' 
            w='full'
            mt={4}
            leftIcon={ctzs && ctzs.length > 0 ? <FaShoppingBag /> : <FaPlus />}
            >
              {ctzs && ctzs.length > 0 ? 'Ver Cotizaciones' : 'Crear Cotización'}
            </Button>            
          </Link>
        </GridItem>
        <GridItem
        borderRadius={[5, 10]}
        px={[3, 5]}
        py={[2, 4]}
        bg='#fcfcfc'
        display='grid'
        gridTemplateRows={['auto 1fr auto']}
        alignItems='center'
        >
          <Text fontWeight='bold' textAlign='center'>
            Tus Recetas
          </Text>
          <Grid templateColumns={['1fr', '1fr']} gap={4} mt={4}>
            {
              recipeLoading
              ? (
                <Box position='relative'>
                  <Loader />
                </Box>
              )
              : (
                <>
                  {
                    recipes && recipes.length > 0
                    ? (
                      <Grid alignSelf='self-start' templateColumns={['1fr', '1fr 1fr']} gap={4} mt={4}>                  
                        {
                          recipes && recipes.map((eachRecipe:Recipe, index:number) => (
                            <RecipeCard key={index} recipe={eachRecipe} />
                          ))
                        }
                      </Grid>
                    )
                    : (
                      <Box>
                        <Center>
                          <Image
                          src={Ilustracion}
                          alt='Empty state'
                          width={100}
                          />
                        </Center>
                        <Center>
                          <Text>Aún no tienes recetas, crea la primera aquí</Text>
                        </Center>
                      </Box>
                    ) 
                  }
                </>
              )
            }
          </Grid>
          <Link href='/cotizador/recetas'>
            <Button 
            variant='outline' 
            w='full'
            mt={4}
            leftIcon={recipes && recipes.length > 0 ? <FaReceipt /> : <FaPlus />}
            >
              {recipes && recipes.length > 0 ? 'Ver recetas' : 'Crear Receta'}
            </Button>
          </Link>
        </GridItem>
      </Grid>
      <AddNew />
    </Flex>
  )
}

export default Cotizador
