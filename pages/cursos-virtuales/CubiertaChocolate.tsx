import Seo from '@/components/seo/Seo'
import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, Input, Text, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import CursoPost from '@/assets/cubierta-chocolate.jpg'
import DbocadosLogo from '@/assets/logo.svg'
import Image from 'next/image'
import { createNewStudent } from '@/services/students'
import { AiOutlineWhatsApp } from "react-icons/ai";

const CubiertaChocolate = () => {
    const toast = useToast()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const groupLink = "https://chat.whatsapp.com/DKHpUFPVkkmC9b1mezQYYy"
    const courseEdition = 'virtual-course-6'
    const handleSubmit = (values: {}) => {
        setLoading(true)
        createNewStudent(values, courseEdition).then(() => {
            setSuccess(true)
            toast({
                title: 'Genial',
                description: "Te has inscrito de forma exitosa, ahora únete al grupo de whatsapp donde se enviará toda la información",
                position:'top-right',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
              setLoading(false)
        })
    }
  return (
    <Seo
    title='Cubierta de chocolate'
    description='Curso virtual de cubierta de chocolate especial'
    >
        <Grid w='full' templateColumns={['1fr', '1fr 1fr']} alignContent='center'>
            <GridItem 
            justifySelf='center'
            display='flex'
            alignItems='center'             
            h={['100%','100vh']}
            >
                <Image
                src={CursoPost}
                alt='Post de curso virtual de cubierta especial de chocolate'
                />
            </GridItem>
            <GridItem 
            alignSelf='center'
            p={8}  
            w='100%' 
            h={['100vh']}
            marginInline='auto'
            bg='#683c10'
            color='white'
            display='grid'
            alignItems='center'
            >
                <Box>
                    <Center>
                    <Box 
                    h='100px' 
                    w='100px' 
                    borderRadius='50%' 
                    bg='white'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    mb={6}
                    >
                        <Image 
                        src={DbocadosLogo} 
                        height={40}
                        alt='logo'
                        />
                    </Box>
                    </Center>
                    {
                        success
                        ? (
                            <>
                                <Center>
                                    <Text fontSize='xl' fontWeight='bold'>Bienvenido</Text>
                                </Center>
                                <Center mt={4}>
                                    <a href={groupLink}>
                                        <Button 
                                        bg='#25D366' 
                                        color='white' 
                                        rightIcon={<AiOutlineWhatsApp style={{color:'white', fontSize:'1.25rem'}} />}
                                        borderRadius='full'
                                        size='lg'
                                        >
                                            Ir al grupo de WhatsApp
                                        </Button>
                                    </a>
                                </Center>
                            </>
                        )
                        : (
                            <>
                                <Heading color='white' textAlign='center' mb={6}>
                                    Formulario de inscripción
                                </Heading>
                                <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    phone: ''
                                }}
                                validate={(values) => {}}
                                onSubmit={handleSubmit}
                                >
                                    {({values, errors, touched}) => 
                                    (
                                        <Form>
                                            <FormControl w='full'>
                                                <FormLabel>Nombre completo</FormLabel>
                                                <Field
                                                as={Input}
                                                required
                                                name='name'
                                                type='text'
                                                placeholder='Nombre'
                                                color='black'
                                                />
                                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                            </FormControl>
                                            <FormControl w='full' mt={5}>
                                                <FormLabel>Correo</FormLabel>
                                                <Field
                                                as={Input}
                                                required
                                                name='email'
                                                type='email'
                                                placeholder='Correo'
                                                color='black'
                                                />
                                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                            </FormControl>
                                            <FormControl w='full' mt={5}>
                                                <FormLabel>Número de teléfono</FormLabel>
                                                <Field
                                                as={Input}
                                                required
                                                name='phone'
                                                type='tel'
                                                placeholder='Teléfono'
                                                color='black'
                                                />
                                                {
                                                    touched.phone && errors.phone &&
                                                    <FormHelperText color='white'>
                                                        {errors.phone}
                                                    </FormHelperText>
                                                }
                                            </FormControl>
                                            <Button 
                                            mt={5} 
                                            w='full'
                                            bg='pinkPrimary' 
                                            color='white'
                                            isDisabled={!values.email || !values.name || !values.phone}
                                            type='submit'
                                            isLoading={loading}
                                            loadingText='Guardando tus datos'
                                            >
                                                Confirmar inscripción
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </>
                        )
                    }
                </Box>
            </GridItem>
        </Grid>
    </Seo>
  )
}

export default CubiertaChocolate
