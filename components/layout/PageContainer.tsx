import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

interface PageProps {
    title: string,
    children: React.ReactNode
}
const PageContainer:React.FC<PageProps> = ({ title, children }) => {
  return (
    <Flex
    direction='column'
    gap={['32px', '64px']}
    px={[4, 6]}
    py={[2, 6]}
    pt={['50px']}
    h={['auto','calc(100vh - 50px)']}
    w={['auto','full']}
    overflowY='scroll'
    position='relative'
    >
        <Heading as='h2' marginInline={['auto', 0]}>
            {title}
        </Heading>
        {children}
    </Flex>
  )
}

export default PageContainer
