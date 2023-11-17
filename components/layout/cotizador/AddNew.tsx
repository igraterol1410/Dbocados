import { Flex, SlideFade, Tooltip, useDisclosure } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { FaPlus, FaReceipt, FaShoppingBag, FaTimes } from 'react-icons/fa'

const AddNew = () => {
    const { isOpen, onToggle } = useDisclosure()
  return (
    <Flex
    direction='column'
    position='fixed'
    bottom='20px'
    right='20px'
    zIndex={1000}
    gap={2}
    >
        <SlideFade in={isOpen} offsetY='20px'>
            <Tooltip placement='left' hasArrow label='Nueva receta'>
                <Link href='cotizador/crear-receta'>
                    <Flex 
                    position='relative'
                    as={motion.div}
                    transition='all ease .5s'
                    alignItems='center' 
                    justifyContent='center' 
                    h='60px' 
                    w='60px' 
                    borderRadius='50%'
                    bg='pink.400'
                    color='white'
                    _hover={{
                        bg:'pink.300'
                    }}
                    onClick={() => {
                        onToggle()
                    }}
                    >
                        <FaReceipt />
                    </Flex>
                </Link>
            </Tooltip>
        </SlideFade>
        <SlideFade in={isOpen} offsetY='20px'>
            <Tooltip placement='left' hasArrow label='Nueva cotización'>
                <Link href='cotizador/crear-cotizacion'>
                    <Flex 
                    as={motion.div}
                    transition='all ease .5s'
                    alignItems='center' 
                    justifyContent='center' 
                    h='60px' 
                    w='60px' 
                    borderRadius='50%'
                    bg='cyan.400'
                    color='white'
                    _hover={{
                        bg:'cyan.300'
                    }}
                    onClick={() => {
                        onToggle()
                    }}
                    >
                        <FaShoppingBag />
                    </Flex>
                </Link>
            </Tooltip>
        </SlideFade>
        <Flex 
        as={motion.div}
        transition='all ease .5s'
        alignItems='center' 
        justifyContent='center' 
        h='60px' 
        w='60px' 
        borderRadius='50% 50% 0 50%'
        bg='pinkPrimary'
        color='white'
        _hover={{
            bg:'pink.400'
        }}
        onClick={onToggle}
        >
            {
                isOpen
                ? (
                    <FaTimes />
                )
                : (
                    <FaPlus />
                )
            }
        </Flex>
    </Flex>
  )
}

export default AddNew
