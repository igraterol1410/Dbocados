import { Box, Flex, List, ListItem, Text, Tooltip, keyframes, Center } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiOutlineShop } from 'react-icons/ai';
import { FaCalculator, FaChalkboardTeacher } from "react-icons/fa";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { LiaUsersSolid } from "react-icons/lia";
import { BiHomeAlt2 } from "react-icons/bi";
import { motion } from 'framer-motion'

import DbocadosLogo from '@/assets/logo.svg'
import Image from 'next/image';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '@/firebase';
import { getUserData } from '@/services/users';

const DashboardAside = ({ asideOpen }:{ asideOpen:boolean }) => {
    const [user, setUser] = useState<any>({})
    const pathname = usePathname()
    const auth = getAuth(firebaseApp)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                getUserData(user.uid).then((res:any) => {
                    setUser(res)
                })
            }
        })
    }, [])
    const items = [
        {
            title:'Inicio',
            icon:<BiHomeAlt2 />,
            link:'/dashboard'
        },
        // {
        //     title:'Mis cursos',
        //     icon:<PiBooks />,
        //     link:'/dashboard/mis-cursos'
        // },
        {
            title:'Cursos digitales',
            icon:<HiOutlineDesktopComputer />,
            link:'/dashboard/cursos-virtuales'
        },
        {
            title:'Cursos presenciales',
            icon:<FaChalkboardTeacher />,
            link:'/dashboard/cursos-presenciales'
        },
        {
            title:'ForoChats',
            icon:<LiaUsersSolid />,
            link:'/dashboard/forochat'
        },
        {
            title:'Productos',
            icon:<AiOutlineShop />,
            link:'/dashboard/productos'
        },
        {
            title:'Cotizador',
            icon:<FaCalculator />,
            link:'/cotizador'
        }
        // {
        //     title:'Mi perfil',
        //     icon:<BiUserCircle />,
        //     link:'/dashboard/perfil'
        // }
    ]
    const openAside = keyframes`
        0% { width: 64px }
        100% { width: 236px }
    `
    const openAsideAction = `${openAside} 1.5s ease-in-out `
    const closeAside = keyframes`
        0% { width: 236px }
        100% { width: 64px }
    `
    const closeAsideAction = `${closeAside} 1.5s ease-in-out `
    const appearText = keyframes`
        0% { opacity: 0 }
        100% { opacity: 1 }
    `
    const appearTextAction = `${appearText} 1.5s ease-in-out `
    const disappearText = keyframes`
        0% { opacity: 1 }
        100% { opacity: 0 }
    `
    const disappearTexttAction = `${disappearText} 1.5s ease-in-out `
  return (
    <Box 
    as={motion.div}
    animation={asideOpen ? openAsideAction : closeAsideAction}
    transition='all ease .5s'
    position='fixed'
    left={0}
    top={0}
    h='100vh'
    bg='#fcfcfc' 
    color='#000'
    display='grid'
    gridTemplateRows='60px 1fr'
    zIndex={1000}
    shadow='xl'
    py={2}
    w={asideOpen ? '300px' : '64px'}
    >
        <Box 
        as={motion.div}
        w={'50px'}
        h={'50px'}
        transition='all ease 1.5s'
        marginInline='auto'
        borderRadius='50%'
        bg='white'
        display='flex'
        alignItems='center'
        justifyContent='center'
        mb={6}
        >
            <Image
            src={DbocadosLogo}
            alt='Logo dbocados'
            />
        </Box>    
        <Flex
        direction='column'
        justifyContent='center'
        h='full'
        w='100%'
        >
            <List
            as={motion.div}
            animation={asideOpen ? openAsideAction : closeAsideAction}
            w='100%'
            spacing={3}
            >
                {
                    items.map((item, index) => (
                        <Link href={item.link} key={index}>
                            <Center>
                                <ListItem 
                                w='100%'
                                display='flex' 
                                gap={4} 
                                alignItems='center'
                                py={3}
                                px={5}
                                bg={pathname === item.link ? '#e80297' : '' }
                                color={pathname === item.link ? 'white' : '' }
                                maxW='100%'
                                fontSize='lg'
                                as={motion.div}
                                transition='all ease .5s'
                                _hover={{
                                    color:`${pathname === item.link ? 'white' : '#e80297'}`
                                }}
                                borderBottom='1px solid rgba(255, 255, 255, .85)'
                                >
                                <Tooltip hasArrow label={item.title} placement='right'>
                                    <Text fontSize='2xl'>
                                        {item.icon}
                                    </Text>
                                </Tooltip>
                                    <Text
                                    as={motion.div}
                                    animation={asideOpen ? appearTextAction : disappearTexttAction}
                                    display={ asideOpen ? 'inline' : 'none'}
                                    >
                                        {item.title}
                                    </Text>
                                </ListItem>
                            </Center>
                        </Link>
                    ))
                }
            </List>
        </Flex>     
    </Box>
  )
}

export default DashboardAside
