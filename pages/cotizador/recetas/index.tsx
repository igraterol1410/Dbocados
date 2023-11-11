import React, {useEffect} from 'react'
import { Box, Button, Center, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import PageContainer from '@/components/layout/PageContainer'
import Image from 'next/image'
import Ilustracion from '@/assets/configuracion.svg'
import Link from 'next/link'
import { FaPlus, FaReceipt } from 'react-icons/fa'
import useGetRecipes from '@/hooks/useGetRecipes'
import Loader from '@/components/layout/Loader'
import RecipeCard from '@/components/layout/cotizador/recetas/RecipeCard'
import { Recipe } from '@/types/recipe'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'

const Recetas = () => {
    const { recipes:currentRecipes, loading } = useGetRecipes()
    const { recipes } = useCotizadorStateContext()
    const { setRecipes } = useCotizadorActionsContext()
    useEffect(() =>{
        if(currentRecipes){
            setRecipes(currentRecipes)
        }
    },[currentRecipes])
  return (
    <PageContainer title={'Recetas'} titleIcon={<FaReceipt />}>
        {
            recipes.length === 0 && !loading
            ? (
                <Introduccion />
            )
            : (
                <GridItem
                borderRadius={[5, 10]}
                px={[3, 5]}
                py={[2, 4]}
                bg='#fcfcfc'
                display='grid'
                h='100%'
                gridTemplateRows={['auto 1fr auto']}
                >
                    <Text fontWeight='bold' textAlign='center'>
                        Tus Recetas
                    </Text>
                    <Grid templateColumns={['1fr', '1fr']} gap={4} mt={4}>
                        {
                        loading
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
                                <Grid alignSelf='self-start' templateColumns={['1fr', '1fr 1fr 1fr']} gap={4} mt={4}>                  
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
                    <Center>
                        <Link href='/cotizador/crear-receta'>
                            <Button 
                            bg='pink.500'
                            color='white'
                            _hover={{
                                bg:'pink.400'
                            }}
                            mt={4}
                            leftIcon={<FaPlus />}
                            >
                            Crear Receta
                            </Button>
                        </Link>
                    </Center>
                </GridItem>
            )
        }
    </PageContainer>
  )
}

const Introduccion = () => {

    return (
        <Box h='100%' w='full' bg='#fcfcfc' borderRadius={[8, 12]} p={6}>
            <Grid 
            templateRows={['1fr auto']}
            gap={6}
            h='full'
            alignItems='center'
            >
                <Box>
                    <Center>
                        <Image
                        src={Ilustracion}
                        alt='Empty state'
                        width={100}
                        />
                    </Center>
                    <Center>
                          <Text>Aún no tienes Recetas, crea la primera aquí</Text>
                    </Center>
                </Box>
                <Flex direction='column' h='100%' justifyContent='center' marginInline='auto'>
                    <Link href='crear-receta'>
                      <Button 
                      bg='pink.500' 
                      _hover={{bg: 'pink.400'}}
                      color='white' 
                      mt={6}
                      leftIcon={<FaPlus />}
                      >
                          Crear una receta
                      </Button>
                    </Link>
                </Flex>
            </Grid>
        </Box>
    )
}

export default Recetas
