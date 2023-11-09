import { Grid, Heading } from '@chakra-ui/react'
import React from 'react'

interface PageProps {
    title: string,
    children: React.ReactNode
}
const PageContainer:React.FC<PageProps> = ({ title, children }) => {
  return (
    <Grid
    gap={['32px', '48px']}
    px={[4, 6]}
    py={[2, 6]}
    pt={['50px']}
    templateRows={['auto auto 1fr']}
    minH={['calc(100vh - 50px)']}
    w={['full','full']}
    overflowY='scroll'
    position='relative'
    >
        <Heading as='h2' marginInline={['auto', 0]}>
            {title}
        </Heading>
        {children}
    </Grid>
  )
}

export default PageContainer
