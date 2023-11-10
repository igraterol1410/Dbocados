import { Flex, Grid, Heading } from '@chakra-ui/react'
import React from 'react'

interface PageProps {
    title: string,
    titleIcon: React.ReactNode,
    children: React.ReactNode
}
const PageContainer:React.FC<PageProps> = ({ title, titleIcon, children }) => {
  return (
    <Grid
    gap={['32px', '48px']}
    px={[4, 6]}
    py={[2, 6]}
    pt={['50px']}
    templateRows={['auto 1fr']}
    minH={['calc(100vh - 50px)']}
    w={['full','full']}
    // overflowY='scroll'
    position='relative'
    bg='rgb(240, 240, 240)'
    >
        <Heading as='h2'>
          <Flex alignItems='center' gap={4}>
            {titleIcon} {title}
          </Flex>
        </Heading>
        {children}
    </Grid>
  )
}

export default PageContainer
