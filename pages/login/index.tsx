import Layout from '@/components/layout/Layout'
import Seo from '@/components/seo/Seo'
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Heading, Input, InputGroup, InputRightAddon, useToast, keyframes, Text } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DbocadosLogo from '@/assets/logo.svg'
import { loginUser } from '@/services/auth'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp } from '@/firebase'

const Login = () => {
    const auth = getAuth(firebaseApp);
    const [password, setPassword] = useState(true)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<any>({})
    const toast = useToast()
    const router = useRouter()
    const animationKeyframesInfo = keyframes`
  0% { transform: translateY(600px); opacity: 0 }
  100% { transform: translateY(0px); opacity: 1 }
`
    const animationInfo = `${animationKeyframesInfo} 1.5s ease-in-out `
    
    const animationKeyframes2 = keyframes`
  0% { transform: translateY(-600px); opacity: 0 }
  100% { transform: translateY(0px); opacity: 1 }
`
    const animation2 = `${animationKeyframes2} 1.5s ease-in-out `

    const handleSubmit = (values: {email:string, password:string}) => {
        setLoading(true)
        loginUser(values).then((res:any) => {
            if(res.error){
                // console.log(res.user)
                // router.push('/dashboard')
                toast({
                    title: 'Error',
                    description: `${res.message}`,
                    position:'top-right',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        setLoading(false)
    })
    .finally(() => {
        setLoading(false)
    })
    }

    onAuthStateChanged(auth, (user) => {
        if(user){
            setUser(user)
        }
    })

    useEffect(() => {
        if(user.uid){
            router.push('/dashboard')
        }
    }, [user])
  return (
    <Seo
    title='Inicio de sesión'
    description='Inicia sesión'
    >
        <Layout>
        <Grid w='full' templateColumns={['1fr', '1fr 1fr']} alignContent='center'>
            <GridItem 
            justifySelf='center'
            display='flex'
            alignItems='center'             
            h={['100%','100vh']}
            as={motion.div}
            animation={animationInfo}
            >
                <Image
                src={DbocadosLogo}
                alt='Logo dbocados'
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
                <Box
                as={motion.div}
                animation={animation2}
                >
                    <Heading color='white' textAlign='center' mb={6}>
                        Inicia sesión
                    </Heading>
                    <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validate={(values) => {}}
                    onSubmit={handleSubmit}
                    >
                        {({values, errors, touched}) => 
                        (
                            <Form>
                                <FormControl w='full' mt={5}>
                                    <FormLabel>Correo</FormLabel>
                                    <InputGroup size='md'>
                                        <Field
                                        as={Input}
                                        name='email'
                                        type='email'
                                        placeholder='Correo'
                                        />
                                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                    </InputGroup>
                                </FormControl>
                                <FormControl w='full' mt={5}>
                                    <FormLabel>Contraseña</FormLabel>
                                    <InputGroup size='md'>
                                        <Field
                                        as={Input}
                                        name='password'
                                        type={password ? 'password' : 'text' }
                                        placeholder='Contraseña'
                                        />
                                        <InputRightAddon color='#e80297' onClick={() => setPassword(!password)} >
                                            {password ? <AiFillEyeInvisible /> : <AiFillEye />}
                                        </InputRightAddon>
                                    </InputGroup>
                                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                </FormControl>
                                <Button 
                                mt={5} 
                                w='full'
                                bg='#e80297' 
                                color='white'
                                type='submit'
                                isLoading={loading}
                                isDisabled={loading || !values.email || !values.password}
                                loadingText='Iniciando sesión'
                                >
                                    Iniciar Sesión
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Text textAlign='center' mt={4}>
                        No tienes cuenta aún? <Link href='/signup'><u>Registrate</u></Link>
                    </Text>
                    <Text textAlign='center' mt={2}>
                        o <Link href='/'><u>Ir al inicio</u></Link>
                    </Text>
                </Box>
            </GridItem>
        </Grid>
        </Layout>
    </Seo>
  )
}

export default Login
